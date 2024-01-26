import getAllBlogs from '@/libs/notion/getAllBlogs';
import React from 'react';
import BlogCard from '../BlogCard';

const BlogList = async () => {
  const data = await getAllBlogs();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-7 mt-5 md:mt-7 ">
      {data?.map((item) => <BlogCard key={item.id} blog={item} />)}
    </div>
  );
};

export default BlogList;
