import { ArrowRight } from 'react-feather';
import Link from 'next/link';
import { Container } from '@/components/ui';
import { Article } from '@/entities/article';
import BlogCard from '@/components/blog/BlogCard';

interface RelateBlogsProps {
  relateBlogs: Article[];
}

const RelateBlogs = ({ relateBlogs }: RelateBlogsProps) => (
  <Container>
    <div className='mb-6 flex justify-between'>
      <h3 className='text-2xl text-gray-900'>相关文章</h3>
      <Link href='/blog'>
        <span className='flex cursor-pointer items-center text-primary transition-all hover:text-primary-hover'>
          查看更多 <ArrowRight size={16} className='ml-2' />
        </span>
      </Link>
    </div>
    <div className='flex flex-col justify-between space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4'>
      {relateBlogs.map(article => (
        <BlogCard blog={article} />
      ))}
    </div>
  </Container>
);

export const RelateBlogSkeleton = () => (
  <div className='mx-auto w-full rounded-sm bg-white p-4'>
    <div className='animate-pulse'>
      <div className='my-2 mx-auto h-3 w-40 rounded-sm bg-skeleton' />

      <div className='flex space-x-4'>
        <div className='flex flex-1 flex-col py-1'>
          <div className='my-2 h-32 rounded-sm bg-skeleton' />
          <div className='my-2 mx-auto h-5 w-[90%] rounded-sm bg-skeleton' />
          <div className='my-2 mx-auto h-4 w-[70%] rounded-sm bg-skeleton' />
        </div>

        <div className='flex flex-1 flex-col py-1'>
          <div className='my-2 h-32 rounded-sm bg-skeleton' />
          <div className='my-2 mx-auto h-5 w-[90%] rounded-sm bg-skeleton' />
          <div className='my-2 mx-auto h-4 w-[70%] rounded-sm bg-skeleton' />
        </div>

        <div className='flex flex-1 flex-col py-1'>
          <div className='my-2 h-32 rounded-sm bg-skeleton' />
          <div className='my-2 mx-auto h-5 w-[90%] rounded-sm bg-skeleton' />
          <div className='my-2 mx-auto h-4 w-[70%] rounded-sm bg-skeleton' />
        </div>
      </div>
    </div>
  </div>
);

export default RelateBlogs;
