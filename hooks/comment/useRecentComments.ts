import { useQuery } from 'react-query';
import { getRecentComments } from '@/api/comment';
import { commentKeys } from '@/constants/queryKeys';

const useRecentComments = () => {
  const res = useQuery(commentKeys.recent(), () => getRecentComments());
  return res;
};

export default useRecentComments;
