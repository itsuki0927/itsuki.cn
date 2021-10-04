import useLocalStorage from 'hooks/useLocalStorage';

const userLikeHistory = {
  comments: [] as number[],
  articles: [] as number[],
};

/**
 * 评论点赞hook
 *
 * @returns
 */
const useLikeHistory = () => {
  const [likeHistory, setLikeHistory] = useLocalStorage<typeof userLikeHistory>(
    'userLikeHistory',
    userLikeHistory
  );

  const isCommentLiked = (commentId: number) => likeHistory.comments.includes(commentId);

  const setCommentLike = (commentId: number) => {
    const comments = likeHistory.comments.concat(commentId);
    console.log(comments);
    setLikeHistory({
      ...likeHistory,
      comments,
    });
  };

  return {
    isCommentLiked,
    setCommentLike,
  } as const;
};

export default useLikeHistory;
