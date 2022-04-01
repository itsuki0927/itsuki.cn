import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { likeComment } from '@/api/comment';
import { initialLikeValue, LikeComments, LikeCommentsKey } from '@/constants/like';
import { commentKeys } from '@/constants/queryKeys';
import { Comment } from '@/entities/comment';
import { useLocalStorage } from '..';

type UseLikeCommentHook = {
  articleId: number;
  commentId: number;
};

const useLikeComment = ({ articleId, commentId }: UseLikeCommentHook) => {
  const queryClient = useQueryClient();
  const [likeComments, setLikeComments] = useLocalStorage<LikeComments>(
    LikeCommentsKey,
    initialLikeValue
  );
  const mutation = useMutation<number, AxiosError>(() => likeComment(commentId), {
    onSuccess: liking => {
      setLikeComments({ ...likeComments, [commentId]: true });
      // NOTE: 有两种方式更新
      // 1. queryClient.invalidateQueries()
      // 2. queryClient.setQueryData()
      queryClient.setQueryData<Comment[]>(
        commentKeys.lists(articleId),
        (oldComments = []) =>
          oldComments.map(comment => {
            if (comment.id === commentId) {
              return { ...comment, liking };
            }
            return comment;
          })
      );
    },
  });

  return { isLike: !!likeComments[commentId], mutation } as const;
};

export default useLikeComment;
