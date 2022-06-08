import { useQuery } from 'react-query';
import { getRecentArticles } from '@/api/article';
import { articleKeys } from '@/constants/queryKeys';

const useRecentArticles = () =>
  useQuery([...articleKeys.recent()], () => getRecentArticles());

export default useRecentArticles;
