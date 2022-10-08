import { useQuery } from '@tanstack/react-query';
import { getRecentBlogs } from '@/api/blog';
import { blogKeys } from '@/constants/queryKeys';

const useRecentBlogs = () => useQuery([...blogKeys.recent()], () => getRecentBlogs());

export default useRecentBlogs;
