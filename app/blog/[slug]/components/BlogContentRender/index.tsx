import getBlog from '@/libs/notion/getBlog';
import { BlogPageProps } from '../../page';
import BlogContentRenderUI from './ui';
import { Suspense } from 'react';
import BlogPageHeaderUI from '../BlogPageHeader/ui';
import BlogPageHeader from '../BlogPageHeader';

const BlogContentRender = async ({ slug }: BlogPageProps['params']) => {
  const { recordMap, blog } = await getBlog(slug);

  return (
    <BlogContentRenderUI
      pageHeader={
        <Suspense fallback={<BlogPageHeaderUI blogViews={0} />}>
          <BlogPageHeader slug={slug} />
        </Suspense>
      }
      recordMap={recordMap}
      blog={blog}
    />
  );
};

export default BlogContentRender;
