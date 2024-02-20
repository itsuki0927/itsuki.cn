import { getBlogViews } from '@/actions/blog';
import BlogPageHeaderUI from './ui';
import getBlog from '@/libs/notion/getBlog';

interface BlogPageHeaderProps {
  slug: string;
}

const BlogPageHeader = async ({ slug }: BlogPageHeaderProps) => {
  const { blog } = await getBlog(slug);
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
