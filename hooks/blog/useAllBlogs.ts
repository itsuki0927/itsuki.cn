import { useQuery } from '@tanstack/react-query';
import { getAllBlogs } from '@/api/blog';
import { blogKeys } from '@/constants/queryKeys';

const useAllBlogs = () => useQuery([...blogKeys.lists()], getAllBlogs);

export type UseAllBlogs = ReturnType<typeof useAllBlogs>;

export default useAllBlogs;
