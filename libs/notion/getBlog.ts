import { unstable_cache as cache } from 'next/cache';
import index from '@/libs/notion';
import getAllBlogs from './getAllBlogs';

const getBlog = cache(
  async (slug: string) => {
    const blogs = await getAllBlogs();
    const blog = blogs?.find((blog) => blog.slug === slug);
    if (!blog) {
      throw new Error(`not found slug: ${slug} record`);
    }
    const recordMap = await index.getPage(blog.id);
    return { recordMap, blog };
  },
  ['getBlog'],
  { revalidate: 3600 },
);

export type GetBlogResponse = Awaited<ReturnType<typeof getBlog>>;

export default getBlog;
