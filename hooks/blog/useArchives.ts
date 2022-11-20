import { useQuery } from '@tanstack/react-query';
import { getArchives } from '@/api/blog';
import { blogKeys } from '@/constants/queryKeys';

const useArchives = () => useQuery(blogKeys.archive(), () => getArchives());

export default useArchives;
