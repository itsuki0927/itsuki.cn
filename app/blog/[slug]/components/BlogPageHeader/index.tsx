import { getBlogViews } from '@/actions/blog';
import { Blog } from '@/types/blog';
import BlogPageHeaderUI from './ui';

interface BlogPageHeaderProps {
  slug: string;
  blog: Blog;
}

const BlogPageHeader = async ({ slug, blog }: BlogPageHeaderProps) => {
  const blogViews = await getBlogViews(slug);

  return (
    <BlogPageHeaderUI
      blogViews={blogViews}
      createdAt={blog.createdAt}
      publishedAt={blog.updatedAt}
    />
  );
};

export default BlogPageHeader;
