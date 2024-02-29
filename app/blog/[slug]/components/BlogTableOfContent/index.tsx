import BlogTableOfContentUI from './ui';
import getHeadings from '@/utils/getHeadings';
import { Blog } from '@/types/blog';

interface BlogTableOfContentProps {
  blog: Blog;
}

const BlogTableOfContent = ({ blog }: BlogTableOfContentProps) => {
  const headings = getHeadings(blog?.content || '');

  return <BlogTableOfContentUI headings={headings} />;
};

export default BlogTableOfContent;
