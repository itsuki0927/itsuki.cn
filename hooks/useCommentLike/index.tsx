import useLocalStorage from '@/hooks/useLocalStorage';
import { initialLikeValue, LikeComments, LikeCommentsKey } from '@/constants/like';

/**
 * 评论点赞hook
 *
 * @returns
 */
const useCommentLike = () => {
  const [likeHistory, setLikeHistory] = useLocalStorage<LikeComments>(
    LikeCommentsKey,
    initialLikeValue
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
