import { useCallback } from 'react';
import { PostCommentHook } from '@/entities/comment';
import usePostComment, {
  UsePostComment,
} from '@/framework/blog/comment/use-post-comment';
import { ValidationError } from '@/framework/blog/utils/errors';
import { MutationHook } from '@/framework/blog/utils/types';
import { isEmail } from '@/utils';
import useComment from './use-comment';

export default usePostComment as UsePostComment<typeof handler>;

const validateFields = ['nickname', 'email', 'content', 'website'] as const;

export const handler: MutationHook<PostCommentHook> = {
  fetchOptions: {
    url: '/api/comment',
    method: 'POST',
  },
  fetcher: ({ options, input: body, fetch }) => {
    if (validateFields.some(key => !body[key])) {
      throw new ValidationError({ message: '请输入必填字段' });
    }
    if (!isEmail(body.email)) {
      throw new ValidationError({ message: '请输入正确的邮箱' });
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
