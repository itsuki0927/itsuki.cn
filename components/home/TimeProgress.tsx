import { getDayTotals } from '@/utils/date';

const TimeProgress = () => {
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
  );
};

export default TimeProgress;
