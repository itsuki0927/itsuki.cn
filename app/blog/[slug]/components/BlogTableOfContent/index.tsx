import getRootPage from '@/libs/notion/getRootPage';
import BlogTableOfContentUI from './ui';
import { GetBlogResponse } from '@/libs/notion/getBlog';

const BlogTableOfContent = async ({ blog, recordMap }: GetBlogResponse) => {
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
