import { useQuery } from 'react-query';
import { getComments } from '@/api/comment';
import { commentKeys } from '@/constants/queryKeys';

const useComments = (articleId: number) => {
  const res = useQuery(commentKeys.lists(articleId), () => getComments(articleId));

  return {
    ...res,
    isEmpty: res.data?.length === 0,
  };
};

export default useComments;
