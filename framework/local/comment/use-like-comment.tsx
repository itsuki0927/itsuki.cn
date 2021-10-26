import { useCallback } from 'react';
import { initialLikeValue, LikeComments, LikeCommentsKey } from '@/constants/like';
import { LikeCommentHook } from '@/entities/comment';
import useLikeComment, {
  UseLikeComment,
} from '@/framework/blog/comment/use-like-comment';
import { MutationHook } from '@/framework/blog/utils/types';
import { useLocalStorage } from '@/hooks/index';

export default useLikeComment as UseLikeComment<typeof handler>;

export const handler: MutationHook<LikeCommentHook> = {
  fetchOptions: {
    url: '/api/comment',
    method: 'PATCH',
  },
  useHook:
    ({ fetch }) =>
    () => {
      const [, setLikeComments] = useLocalStorage<LikeComments>(
        LikeCommentsKey,
        initialLikeValue
      );
      return useCallback(
        async ({ commentId }) => {
          setLikeComments(prev => ({ ...prev, [commentId]: true }));
          return fetch({
            input: { commentId },
          });
        },
        [setLikeComments]
      );
    },
};
