import { GraphQLError } from 'graphql';
import { useMutation, useQueryClient } from 'react-query';
import { likeComment } from '@/api/comment';
import { initialLikeValue, LikeComments, LikeCommentsKey } from '@/constants/like';
import { commentKeys } from '@/constants/queryKeys';
import { Comment, LikeCommentResponse } from '@/entities/comment';
import { SearchResponse } from '@/types/response';
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
  const mutation = useMutation<LikeCommentResponse, GraphQLError>(
    () => likeComment(commentId),
    {
      onSuccess: ({ likeComment: liking }) => {
        setLikeComments({ ...likeComments, [commentId]: true });
        // NOTE: 有两种方式更新
        // 1. queryClient.invalidateQueries()
        // 2. queryClient.setQueryData()
        queryClient.setQueryData<SearchResponse<Comment>>(
          commentKeys.lists(articleId),
          oldComments => {
            if (!oldComments) return { total: 0, data: [], filter: null };
            return {
              ...oldComments,
              data: oldComments.data.map(comment => {
                if (Number(comment.id) === commentId) {
                  return { ...comment, liking };
                }
                return comment;
              }),
              filter: null,
            };
          }
        );
      },
    }
  );

  return { isLike: !!likeComments[commentId], mutation } as const;
};

export default useLikeComment;
