import { initialLikeValue, LikeArticles, LikeArticlesKey } from '@/constants/like';
import useLocalStorage from '@/hooks/useLocalStorage';

const useInLikeArticles = (articleId: number) => {
  const [likeArticles] = useLocalStorage<LikeArticles>(LikeArticlesKey, initialLikeValue);

  return likeArticles[articleId];
};

export default useInLikeArticles;
