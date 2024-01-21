import { BASE_URL } from '@/constants/app';
import getAllBlogs from '@/libs/notion/getAllBlogs';

const sitemap = async () => {
  const allBlogs = await getAllBlogs();
  const blogs = allBlogs.map((blog) => ({
    url: `${BASE_URL}/blog/${blog.slug}`,
    lastModified:
      blog.updatedAt ||
      blog.publishedAt ||
      blog.createdAt ||
      new Date().toISOString().split('T')[0],
  }));

  let routes = ['', '/blog', '/guestbook'].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...blogs];
};

export const revalidate = 60;

export default sitemap;
