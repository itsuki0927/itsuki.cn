import { useQuery } from 'react-query';
import { getComments } from '@/api/comment';
import { commentKeys } from '@/constants/queryKeys';
import useLocalStorage from '../useLocalStorage';
import { initialLikeValue, LikeComments, LikeCommentsKey } from '@/constants/like';

const useComments = (articleId: number) => {
  const [likeArticles] = useLocalStorage<LikeComments>(LikeCommentsKey, initialLikeValue);
  const res = useQuery(commentKeys.lists(articleId), () => getComments(articleId), {
    select: (comments = []) =>
      comments.map(item => ({
        ...item,
        isLike: !!likeArticles[item.id],
      })),
  });

  return {
    ...res,
    isEmpty: res.data?.length === 0,
  };
};

export default useComments;
