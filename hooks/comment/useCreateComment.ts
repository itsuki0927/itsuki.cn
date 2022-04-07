import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { createComment } from '@/api/comment';
import { Comment, PostCommentBody } from '@/entities/comment';
import { commentKeys } from '@/constants/queryKeys';

const useCreateComment = (articleId: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<Comment, AxiosError, PostCommentBody>(
    newComment => createComment(newComment),
    {
      onSuccess: data => {
        // queryCient.invalidateQueries([{ articleId }, 'comments']);
        queryClient.setQueryData<Comment[]>(
          commentKeys.lists(articleId),
          (oldComments = []) => oldComments.concat(data)
        );
      },
    }
  );
  return mutation;
};

export default useCreateComment;
