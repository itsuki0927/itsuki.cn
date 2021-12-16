import { initialLikeValue, LikeComments, LikeCommentsKey } from '@/constants/like';
import { useLocalStorage } from '@/hooks';

const useInLikeComments = (commentId: number) => {
  const [likeArticles] = useLocalStorage<LikeComments>(LikeCommentsKey, initialLikeValue);

  return likeArticles[commentId];
};

export default useInLikeComments;
