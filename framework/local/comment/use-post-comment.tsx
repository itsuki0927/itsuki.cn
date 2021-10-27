import { useCallback } from 'react';
import { PostCommentHook } from '@/entities/comment';
import usePostComment, {
  UsePostComment,
} from '@/framework/blog/comment/use-post-comment';
import { MutationHook } from '@/framework/blog/utils/types';
import useComment from './use-comment';
import { ValidationError } from '@/framework/blog/utils/errors';

export default usePostComment as UsePostComment<typeof handler>;

const validateFields = ['nickname', 'email', 'content', 'website'] as const;

export const handler: MutationHook<PostCommentHook> = {
  fetchOptions: {
    url: '/api/comment',
    method: 'POST',
  },
  fetcher: ({ options, input: body, fetch }) => {
    if (validateFields.some(key => !body[key])) {
      throw new ValidationError({ message: '请输入必填字段!!!' });
    }
    return fetch({
      ...options,
      body,
    });
  },
  useHook:
    ({ fetch }) =>
    ({ articleId }) => {
      const { mutate, data } = useComment({ articleId });
      return useCallback(
        async input => {
          const postData = await fetch({ input });
          await mutate(data?.concat(postData), false);
          return postData;
        },
        [data, mutate]
      );
    },
};
