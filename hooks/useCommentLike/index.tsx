import {
  initialUserLikeHistory,
  UserLikeComments,
  USER_LIKE_COMMENT,
} from '@/constants/like';
import useLocalStorage from 'hooks/useLocalStorage';

/**
 * 评论点赞hook
 *
 * @returns
 */
const useCommentLike = () => {
  const [likeHistory, setLikeHistory] = useLocalStorage<UserLikeComments>(
    USER_LIKE_COMMENT,
    initialUserLikeHistory
  );

  const isCommentLiked = (commentId: number) => !!likeHistory[commentId];

  const setCommentLike = (commentId: number) => {
    setLikeHistory({
      ...likeHistory,
      [commentId]: true,
    });
  };

  return {
    isCommentLiked,
    setCommentLike,
  } as const;
};

export default useCommentLike;
