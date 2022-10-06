import { GraphQLError } from 'graphql';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { QueryKey, useMutation, useQueryClient } from 'react-query';
import { createComment } from '@/api/comment';
import { GAEventCategories } from '@/constants/gtag';
import { commentKeys } from '@/constants/queryKeys';
import { Comment, PostCommentBody, QueryCommentsResponse } from '@/entities/comment';
import { gtag } from '@/utils/gtag';

const useCreateComment = (blogId: number) => {
  const queryClient = useQueryClient();
  const commentKey = commentKeys.lists(blogId) as QueryKey;
  const mutation = useMutation<Comment, GraphQLError, PostCommentBody>(
    newComment => createComment(newComment),
    {
      onMutate: async newComment => {
        await queryClient.cancelQueries(commentKey);

        const previousComments = queryClient.getQueryData(commentKey);

        queryClient.setQueryData<QueryCommentsResponse['comments']>(
          commentKey,
          oldData => ({
            ...oldData,
            data: [newComment as Comment, ...(oldData?.data ?? [])],
            total: (oldData?.total ?? 0) + 1,
            filter: null,
          })
        );

        return { previousComments };
      },
      onError: (err, _, context: any) => {
        queryClient.setQueryData(commentKey, context?.previousComments);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(commentKey);
      },
    }
  );

  const postComment = useCallback(
    (params: PostCommentBody) => {
      gtag.event('push_comment', {
        category: GAEventCategories.Comment,
        label: `blog_id: ${blogId}`,
      });
      return toast
        .promise(mutation.mutateAsync(params), {
          loading: '发射中...',
          success: <b>👏 发射成功</b>,
          error: <b>🙌 发射失败</b>,
        })
        .then(
          () => true,
          () => false
        );
    },
    [blogId, mutation]
  );

  return { ...mutation, postComment } as const;
};

export default useCreateComment;
