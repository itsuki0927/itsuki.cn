import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { createComment } from '@/api/comment';
import { Comment, PostCommentBody, QueryCommentsResponse } from '@/entities/comment';
import { commentKeys } from '@/constants/queryKeys';

const useCreateComment = (articleId: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<Comment, AxiosError, PostCommentBody>(
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
              data: oldData.data.concat(newData),
              total: oldData.total + 1,
            };
          }
        );
      },
    }
  );
  return mutation;
};

export default useCreateComment;
