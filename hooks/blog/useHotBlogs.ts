import { useQuery } from '@tanstack/react-query';
import { getHotBlogs } from '@/api/blog';
import { blogKeys } from '@/constants/queryKeys';

const useHotBlogs = () => useQuery([...blogKeys.banner()], () => getHotBlogs());

export default useHotBlogs;
