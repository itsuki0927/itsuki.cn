import BlogTableOfContentUI from './ui';
import { BlogPageProps } from '../../page';
import getHeadings from '@/utils/getHeadings';
import { getBlog } from '@/actions/blog';

const BlogTableOfContent = async ({ slug }: BlogPageProps['params']) => {
  const blog = await getBlog(slug);
  const headings = getHeadings(blog?.content || '');

  return <BlogTableOfContentUI headings={headings} />;
};

export default BlogTableOfContent;
