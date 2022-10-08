import { useQuery } from '@tanstack/react-query';
import { getArchives } from '@/api/blog';
import { blogKeys } from '@/constants/queryKeys';
import { Blog, BlogArchive, BlogArchiveResponse } from '@/entities/blog';

const convertToArchiveData = (data: Blog[]) => {
  const result: BlogArchiveResponse = new Map();

  data.forEach(blog => {
    const createAt = new Date(blog.createAt);
    const year = `${createAt.getFullYear()}`;
    const blogs: BlogArchive[] = result.get(year) ?? [];
    result.set(year, blogs.concat(blog));
  });

  return result;
};

const useArchives = () =>
  useQuery(blogKeys.archive(), () => getArchives(), {
    select: ({ data }) => convertToArchiveData(data),
  });

export default useArchives;
