import { useQuery } from '@tanstack/react-query';
import { getBlogs } from '@/api/blog';
import { blogKeys } from '@/constants/queryKeys';

const useBlogs = () => useQuery([...blogKeys.lists()], () => getBlogs());

export type UseBlogs = ReturnType<typeof useBlogs>;

export default useBlogs;
