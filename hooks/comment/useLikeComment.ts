import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { likeComment } from '@/api/comment';
import { initialLikeValue, LikeComments, LikeCommentsKey } from '@/constants/like';
import { commentKeys } from '@/constants/queryKeys';
import { Comment } from '@/entities/comment';
import { useLocalStorage } from '..';

const useLikeComment = (articleId: number) => {
  const queryClient = useQueryClient();
  const [likeArticles, setLikeArticles] = useLocalStorage<LikeComments>(
    LikeCommentsKey,
    initialLikeValue
  );
  const mutation = useMutation<number, AxiosError, number>(likeComment, {
    onSuccess: (liking, commentId) => {
      setLikeArticles({ ...likeArticles, [commentId]: true });
      // NOTE: 有两种方式更新
      // 1. queryClient.invalidateQueries()
      // 2. queryClient.setQueryData()
      queryClient.setQueryData<Comment[]>(
        commentKeys.lists(articleId),
        (oldComments = []) =>
          oldComments.map(comment => {
            if (comment.id === commentId) {
              return { ...comment, liking, isLike: true };
            }
            return comment;
          })
      );
    },
  });

  return mutation;
};

export default useLikeComment;
