import useLocalStorage from 'hooks/useLocalStorage';

const userLikeHistory = {
  comments: [] as number[],
  articles: [] as number[],
};

/**
 * 评论、文章点赞hook
 *
 * @returns
 */
const useLikeHistory = () => {
  const [likeHistory, setLikeHistory] = useLocalStorage<typeof userLikeHistory>(
    'userLikeHistory',
    userLikeHistory
  );

  const isCommentLiked = (commentId: number) => likeHistory.comments.includes(commentId);

  const isArticleLiked = (articleId: number) => likeHistory.articles.includes(articleId);

  const setCommentLike = (commentId: number) => {
    const comments = likeHistory.comments.concat(commentId);
    setLikeHistory({
      ...likeHistory,
      comments,
    });
  };

  const setArticleLike = (articleId: number) => {
    const articles = likeHistory.articles.concat(articleId);
    setLikeHistory({
      ...likeHistory,
      articles,
    });
  };

  return {
    isCommentLiked,
    isArticleLiked,
    setCommentLike,
    setArticleLike,
  } as const;
};

export default useLikeHistory;
