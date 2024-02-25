import { Blog } from '@/types/blog';
import React from 'react';
import BlogCard, { BlogCardProps } from '../BlogCard';
import Empty from '@/components/common/Empty';

interface BlogListUIProps extends Pick<BlogCardProps, 'displayCategory'> {
  blogs?: Blog[];
}

const BlogListUI = ({ blogs, displayCategory }: BlogListUIProps) => {
  if (!blogs?.length) {
    return (
      <Empty>已经在绞尽脑汁的写文章了，只是速度有点慢，再等等再等等</Empty>
    );
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-7 mt-5 md:mt-7 ">
      {blogs?.map((item) => (
        <BlogCard key={item.id} blog={item} displayCategory={displayCategory} />
      ))}
    </div>
  );
};

export default BlogListUI;
