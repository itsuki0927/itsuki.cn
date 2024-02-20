import React, { Suspense } from 'react';
import BlogCard, { BlogCardProps, BlogCardSkeleton } from '../BlogCard';
import { getAllBlogs } from '@/actions/blog';
import { BlogSearchParams } from '@/types/blog';

interface BlogListParams extends Pick<BlogCardProps, 'displayCategory'> {
  params?: BlogSearchParams;
}

const Main = async ({ params, displayCategory }: BlogListParams) => {
  const data = await getAllBlogs(params);

  if (data?.length === 0) {
    return <div>空空如也</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-7 mt-5 md:mt-7 ">
      {data?.map((item) => (
        <BlogCard key={item.id} blog={item} displayCategory={displayCategory} />
      ))}
    </div>
  );
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
