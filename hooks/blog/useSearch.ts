import { useQuery } from 'react-query';
import { getBlogs } from '@/api/blog';
import { blogKeys } from '@/constants/queryKeys';

const useSearch = (name: string) =>
  useQuery(blogKeys.search(name), () => getBlogs({ name }));

export type UseSearch = ReturnType<typeof useSearch>;

export default useSearch;
