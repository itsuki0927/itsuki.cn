import Link from 'next/link';
import { ArrowRight } from 'react-feather';
import { getRecentBlogs } from '@/api/blog';
import BlogCard from '@/components/blog/BlogCard';

const RecentBlogs = async () => {
  const blogs = await getRecentBlogs();
  return (
    <>
      <div className='flex flex-grow items-center justify-between bg-gray-50 p-6'>
        <span className='text-2xl text-gray-900'>最近文章</span>
        <Link href='/blog'>
          <span className='flex cursor-pointer items-center text-primary transition-colors duration-100 hover:text-primary'>
            查看更多
            <ArrowRight size={16} className='ml-2' />
          </span>
        </Link>
      </div>
      <div className='flex flex-grow flex-wrap items-start gap-6 sm:gap-8 sm:space-y-0'>
        {blogs.data.map((blog, i) => (
          <BlogCard blog={blog} key={blog.id} style={{ animationDelay: `${0.2 * i}s` }} />
        ))}
      </div>
    </>
  );
};

export default RecentBlogs;
