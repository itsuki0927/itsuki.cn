import { getAllBlogs } from '@/actions/blog';
import { BlogSearchParams } from '@/types/blog';
import { Suspense } from 'react';
import { BlogCardProps, BlogCardSkeleton } from '../BlogCard';
import BlogListUI from './ui';

export interface BlogListParams extends Pick<BlogCardProps, 'displayCategory'> {
  params?: BlogSearchParams;
}

const Main = async ({ params, displayCategory }: BlogListParams) => {
  const data = await getAllBlogs(params);

  return <BlogListUI blogs={data} displayCategory={displayCategory} />;
};

const BlogList = (props: BlogListParams) => {
  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-7 mt-5 md:mt-7 ">
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
        </div>
      }
    >
      <Main {...props} />
    </Suspense>
  );
};

export default BlogList;
