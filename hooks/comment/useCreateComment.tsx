import toast from 'react-hot-toast';
import { useCallback } from 'react';
import { GraphQLError } from 'graphql';
import { useMutation, useQueryClient } from 'react-query';
import { createComment } from '@/api/comment';
import { commentKeys } from '@/constants/queryKeys';
import { Comment, PostCommentBody, QueryCommentsResponse } from '@/entities/comment';
import { gtag } from '@/utils/gtag';
import { GAEventCategories } from '@/constants/gtag';

const useCreateComment = (articleId: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<Comment, GraphQLError, PostCommentBody>(
    newComment => createComment(newComment),
    {
      onSuccess: newData => {
        // queryCient.invalidateQueries([{ articleId }, 'comments']);
        queryClient.setQueryData<QueryCommentsResponse['comments']>(
          commentKeys.lists(articleId),
          oldData => {
            if (!oldData) {
              return {
                data: [],
                total: 0,
                filter: null,
              } as QueryCommentsResponse['comments'];
            }
            return {
              ...oldData,
              data: [newData, ...oldData.data],
              total: oldData.total + 1,
            };
          }
        );
      },
    }
  );

  const postComment = useCallback(
    (params: PostCommentBody) => {
      gtag.event('push_comment', {
        category: GAEventCategories.Comment,
        label: `article_id: ${articleId}`,
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
    [articleId, mutation]
  );

  return { ...mutation, postComment } as const;
};

export default useCreateComment;
