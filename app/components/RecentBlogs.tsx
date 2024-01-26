import getAllBlogs from '@/libs/notion/getAllBlogs';
import { Wand2 } from 'lucide-react';
import React from 'react';
import BlogCard, { BlogCardSkeleton } from '../blog/components/BlogCard';

const RecentBlogs = async () => {
  const blogs = await getAllBlogs({ onlyRecent: true });

  return (
    <div className="flex flex-col gap-6">
      <h2 className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <Wand2 size={20} />
        <span className="ml-2">少动嘴，多动手（近期文章）</span>
      </h2>
      {blogs?.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
    </div>
  );
};

export default RecentBlogs;
