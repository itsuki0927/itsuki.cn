import useLocalStorage from 'hooks/useLocalStorage';

const userLikeHistory = {
  comments: [] as number[],
  articles: [] as number[],
};

/**
 * 文章点赞hook
 *
 * @returns
 */
const useArticleLike = (articleId: number) => {
  const [likeHistory, setLikeHistory] = useLocalStorage<typeof userLikeHistory>(
    'userLikeHistory',
    userLikeHistory
  );

  const isLiked = likeHistory.articles.includes(articleId);

  const setArticleLike = () => {
    const articles = likeHistory.articles.concat(articleId);
    setLikeHistory({
      ...likeHistory,
      articles,
    });
  };

  return {
    isLiked,
    setArticleLike,
  } as const;
};

export default useArticleLike;
