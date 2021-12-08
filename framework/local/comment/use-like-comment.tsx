import { useCallback } from 'react';
import { initialLikeValue, LikeComments, LikeCommentsKey } from '@/constants/like';
import { LikeCommentHook } from '@/entities/comment';
import useLikeComment, {
  UseLikeComment,
} from '@/framework/blog/comment/use-like-comment';
import { MutationHook } from '@/framework/blog/utils/types';
import { useLocalStorage } from '@/hooks/index';
import useComment from './use-comment';

export default useLikeComment as UseLikeComment<typeof handler>;

export const handler: MutationHook<LikeCommentHook> = {
  fetchOptions: {
    url: '/api/comment',
    method: 'PATCH',
  },
  useHook:
    ({ fetch }) =>
    ({ articleId }) => {
      const { mutate, data } = useComment({ articleId });
      const [, setLikeComments] = useLocalStorage<LikeComments>(
        LikeCommentsKey,
        initialLikeValue
      );

      return useCallback(
        async ({ commentId }) => {
          if (!data) {
            return fetch({
              input: { commentId },
            });
          }

          setLikeComments(prev => ({ ...prev, [commentId]: true }));

          const updatedData = data.map(item => {
            if (item.id === commentId) {
              return { ...item, liking: item.liking + 1 };
            }
            return item;
          });

          await mutate(updatedData, false);

          return fetch({
            input: { commentId },
          });
        },
        [data, mutate, setLikeComments]
      );
    },
};
