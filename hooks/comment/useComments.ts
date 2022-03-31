import { useQuery } from 'react-query';
import { getComments } from '@/api/comment';

const useComments = (articleId: number) => {
  const res = useQuery([{ articleId }, 'comments'], () => getComments(articleId));

  return {
    ...res,
    isEmpty: res.data?.length === 0,
  };
};

export default useComments;
