import { useQuery } from 'react-query';
import { getArticles } from '@/api/article';
import { articleKeys } from '@/constants/queryKeys';

const useSearch = (name: string) =>
  useQuery(articleKeys.search(name), () => getArticles({ name }));

export type UseSearch = ReturnType<typeof useSearch>;

export default useSearch;
