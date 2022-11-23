import Link from 'next/link';
import { ArrowRight, Plus } from 'react-feather';
import { getRecentComments } from '@/api/comment';
import CommentList from '@/components/comment/CommentList';
import MessageSvg from '@/components/icons/MessageSvg';
import Status from '@/components/ui/Status';

const RecentComments = async () => {
  const comments = await getRecentComments();
  return (
    <>
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
    </>
  );
};

export default RecentComments;
