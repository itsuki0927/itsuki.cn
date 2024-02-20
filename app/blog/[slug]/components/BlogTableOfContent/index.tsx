import getRootPage from '@/libs/notion/getRootPage';
import BlogTableOfContentUI from './ui';
import getBlog from '@/libs/notion/getBlog';
import { BlogPageProps } from '../../page';

const BlogTableOfContent = async ({ slug }: BlogPageProps['params']) => {
  const { blog, recordMap } = await getBlog(slug);
  const { block: allBlocks } = await getRootPage();

  return (
    <BlogTableOfContentUI
      blog={blog}
      blocks={allBlocks}
      recordMap={recordMap}
    />
  );
};

export default BlogTableOfContent;
