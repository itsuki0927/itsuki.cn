import { Edit2, Eye, MessageCircle, MessageSquare, Tag } from 'react-feather';
import { SiteSummary } from '@/entities/summary';

interface BannerProps {
  summary?: SiteSummary;
}

const Statistics = ({ summary }: BannerProps) => {
  const list = [
    /* { title: '建站天数', count: summary?.diffDay ?? 300, icon: <Coffee size={16} /> }, */
    { title: '全站文章', count: summary?.blog, icon: <Edit2 size={16} /> },
    { title: '全站阅读', count: summary?.reading, icon: <Eye size={16} /> },
    { title: '全站标签', count: summary?.tag, icon: <Tag size={16} /> },
    { title: '全站评论', count: summary?.comment, icon: <MessageSquare size={16} /> },
    { title: '全站留言', count: summary?.guestbook, icon: <MessageCircle size={16} /> },
  ];

  return (
    <div className='bg-white'>
      <div className='mx-auto flex max-w-4xl flex-row flex-wrap py-6'>
        {list.map(item => (
          <div
            className='w-1/2 flex-grow p-4 text-left sm:w-auto sm:p-6'
            key={item.title}
          >
            <p className='flex items-center space-x-2 text-sm text-gray-400'>
              <span className='text-gray-500'>{item.title}</span>
              {item.icon}
            </p>
            <div className='mt-2 text-3xl font-medium text-gray-700'>{item.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
