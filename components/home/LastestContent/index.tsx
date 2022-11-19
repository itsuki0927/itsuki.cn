import Link from 'next/link';
import { ArrowRight, Plus } from 'react-feather';
import { HomePageProps } from '@/app/page';
import BlogCard from '@/components/blog/BlogCard';
import CommentList from '@/components/comment/CommentList';
import MessageSvg from '@/components/icons/MessageSvg';
import Status from '@/components/ui/Status';

const LastestContent = ({
  blogs,
  comments,
}: Pick<HomePageProps, 'blogs' | 'comments'>) => {
  return (
    <>
      <div className='space-y-8 sm:max-w-[800px]'>
        <div className='flex flex-grow items-center justify-between bg-gray-50 p-6'>
          <span className='text-2xl text-gray-900'>最近文章</span>
          <Link href='/blog'>
            <span className='flex cursor-pointer items-center text-primary transition-colors duration-100 hover:text-primary'>
              查看更多
              <ArrowRight size={16} className='ml-2' />
            </span>
          </Link>
        </div>

        <div className='flex flex-grow flex-wrap items-center gap-6 sm:gap-8 sm:space-y-0'>
          {blogs.data.map((blog, i) => (
            <BlogCard
              blog={blog}
              key={blog.id}
              style={{ animationDelay: `${0.2 * i}s` }}
            />
          ))}
        </div>

        <div className='flex items-center justify-between bg-gray-50 p-6'>
          <span className='text-2xl text-gray-900'>最近留言</span>
          <Link href='/guestbook'>
            <span className='flex cursor-pointer items-center text-primary transition-colors duration-100 hover:text-primary'>
              查看更多
              <ArrowRight size={16} className='ml-2' />
            </span>
          </Link>
        </div>

        <div className='flex flex-col '>
          <CommentList
            data={comments?.data.slice(0, 2)}
            className='space-y-6 sm:space-y-8'
            renderEmpty={
              <Status
                title='空空如也'
                icon={<MessageSvg />}
                description='我也想展示评论, 奈何数据库一条都没得'
              >
                <Link href='/guestbook'>
                  <Status.Button className='mt-4'>
                    <Plus size={16} className='mr-1' />
                    <span>添加评论</span>
                  </Status.Button>
                </Link>
              </Status>
            }
          />
        </div>
      </div>
    </>
  );
};

export default LastestContent;
