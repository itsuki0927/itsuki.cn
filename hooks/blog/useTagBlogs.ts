import { useQuery } from '@tanstack/react-query';
import { getBlogs } from '@/api/blog';
import { blogKeys } from '@/constants/queryKeys';

const useTagBlogs = (tagPath: string) =>
  useQuery(blogKeys.tag(tagPath), () => getBlogs({ tagPath }));

export default useTagBlogs;
