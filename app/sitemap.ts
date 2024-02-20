import { getAllBlogs } from '@/actions/blog';
import { getAllCategories } from '@/actions/category';
import { BASE_URL } from '@/constants/app';

const sitemap = async () => {
  const allBlogs = await getAllBlogs();
  const allCategories = await getAllCategories();

  const blogs = allBlogs.map((blog) => ({
    url: `${BASE_URL}/blog/${blog.slug}`,
    lastModified:
      blog.updatedAt ||
      blog.createdAt ||
      new Date().toISOString().split('T')[0],
  }));

  const categories = allCategories.map((category) => ({
    url: `${BASE_URL}/category/${category.slug}`,
    lastModified:
      category.updatedAt ||
      category.createdAt ||
      new Date().toISOString().split('T')[0],
  }));

  const routes = ['', '/blog', '/guestbook'].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...blogs, ...categories];
};

export const revalidate = 60;

export default sitemap;
