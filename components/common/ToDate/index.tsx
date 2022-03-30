import { dateToYMD, dateToYMDm, wrapToDate } from '@/utils/date';

export type DateTransformType = 'ago' | 'YMD' | 'YMDm';

export type DateSeparatorType = '-' | '/';

interface DateProps {
  date: string | Date;
  to?: DateTransformType;
  separator?: DateSeparatorType;
}

const formatDate = (
  dateParams: string | Date,
  to: DateTransformType = 'YMDm',
  separator: DateSeparatorType = '-'
) => {
  const date = wrapToDate(dateParams);
  if (to === 'YMD') {
    return dateToYMD(date, separator);
  }
  if (to === 'YMDm') {
    return dateToYMDm(date, separator);
  }
  if (to === 'ago') {
    const pluralize = (time: number, label: string) => `${time} ${label}前`;

    const between = Date.now() / 1000 - Number(date) / 1000;
    const hourS = 3600;
    const dayS = hourS * 24;
    const weekS = dayS * 7;
    const monthS = dayS * 30;
    const yearS = monthS * 12;

    if (between < hourS) {
      return ~~(between / 60) === 0 ? '刚刚' : pluralize(~~(between / 60), '分钟');
    }
    if (between < dayS) {
      return pluralize(~~(between / hourS), '小时');
    }
    if (between < weekS) {
      return pluralize(~~(between / dayS), '天');
    }
    if (between < monthS) {
      return pluralize(~~(between / weekS), '周');
    }
    if (between < yearS) {
      return pluralize(~~(between / monthS), '月');
    }
    return pluralize(~~(between / yearS), '年');
  }

  return null;
};

const ToDate = ({ date, to = 'ago', separator = '-' }: DateProps) => (
  <>{formatDate(date, to, separator)}</>
);

export default ToDate;
