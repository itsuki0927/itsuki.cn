import { initialUserLikeHistory, UserLikeArticles, USER_LIKE_ARTICLE } from '@/constants/like';
import useLocalStorage from 'hooks/useLocalStorage';

/**
 * 文章点赞hook
 *
 * @returns
 */
const useArticleLike = (articleId: number) => {
  const [likeHistory, setLikeHistory] = useLocalStorage<UserLikeArticles>(
    USER_LIKE_ARTICLE,
    initialUserLikeHistory
  );

  const isLiked = !!likeHistory[articleId];

  const setArticleLike = () => {
    setLikeHistory({
      ...likeHistory,
      [articleId]: true,
    });
  };

  return {
    isLiked,
    setArticleLike,
  } as const;
};

export default useArticleLike;
