import Link from 'next/link';
import { HomePageProps } from '@/app/page';
import PtnContainer from '@/components/ui/PtnContainer';
import { getDayTotals } from '@/utils/date';
import { getBlogDetailRoute } from '@/utils/url';
import TagLabel from './Tag';

const todoList = [
  { name: '新版UI', percent: '60%' },
  { name: '不知道写什么博客', percent: '10%' },
  { name: '阅读@tanstack/react-query中', percent: '50%' },
];

const HomeSidebar = ({ tags, hotBlogs }: Pick<HomePageProps, 'tags' | 'hotBlogs'>) => {
  const {
    dayInYearTotal,
    dayInYear,
    dayInMonthTotal,
    dayInMonth,
    dayInWeekTotal,
    dayInWeek,
    hourInDayTotal,
    hourInDay,
  } = getDayTotals();
  return (
    <div className='mt-8 flex-grow space-y-6 border-t border-dashed border-t-gray-200 pt-8 sm:mt-0 sm:ml-8 sm:max-w-sm sm:space-y-8 sm:border-none sm:pt-0'>
      <div className='flex h-20 items-center justify-between bg-gray-50 p-6'>
        <span>纵有疾风起, 人生不言弃</span>
        <span className='text-sm text-gray-400'>已跑步3800公里</span>
      </div>

      <ul className='flex flex-col space-y-2 bg-gray-50 p-6'>
        <li className='text-xl font-medium text-gray-900'>时间</li>
        <li className='text-gray-700'>
          当天已过 {hourInDay} / {hourInDayTotal}{' '}
        </li>
        <li className='text-gray-600'>
          本周已过 {dayInWeek} / {dayInWeekTotal}{' '}
        </li>
        <li className='text-gray-500'>
          本月已过 {dayInMonth} / {dayInMonthTotal}{' '}
        </li>
        <li className='text-gray-400'>
          本年已过 {dayInYear} / {dayInYearTotal}
        </li>
      </ul>

      <PtnContainer as='ul' className='flex flex-col space-y-2 p-6'>
        <div className='text-xl font-medium text-gray-900'>热门</div>
        {hotBlogs?.data.slice(0, 6).map(blog => (
          <Link href={getBlogDetailRoute(blog.path)}>
            <li
              key={blog.id}
              className='cursor-pointer list-inside list-square transition-colors hover:text-primary'
            >
              {blog.title}
            </li>
          </Link>
        ))}
      </PtnContainer>

      <ul className='flex flex-col space-y-2 bg-gray-50 p-6'>
        <div className='text-xl font-medium text-gray-900'>TODO</div>
        {todoList.map(todo => (
          <li
            key={todo.name}
            className='flex list-inside list-decimal items-center justify-between transition-colors'
          >
            <span>{todo.name}</span>

            <span className='text-sm text-gray-500'>{todo.percent}</span>
          </li>
        ))}
      </ul>

      <div className='space-y-4 bg-gray-50 p-6'>
        <div className='text-xl font-medium text-gray-900'>标签</div>
        <ul className='flex flex-wrap'>
          {tags?.map(tag => (
            <TagLabel tag={tag} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomeSidebar;
