export type DateTransformType = 'ago' | 'YMD' | 'YMDHm';

export type DateSeparatorType = '-' | '/';

// 将输入转换为 Date 对象
const parseToDate = (input: string | Date | number): Date | null =>
  input instanceof Date ? input : new Date(input);

// 将数字填充为两位字符串，例如 5 -> '05'
const padNumber = (num: number): string => num.toString().padStart(2, '0');

// date -> YYYY-MM-DD
const formatDateToYMD = (date: Date, separator: DateSeparatorType): string => {
  const year = date.getFullYear();
  const month = padNumber(date.getMonth() + 1);
  const day = padNumber(date.getDate());
  return [year, month, day].join(separator);
};

// 返回与小时相关的中文前缀
const getHourPrefix = (hour: number): string => {
  const ranges = [
    { start: 1, end: 6, prefix: '凌晨' },
    { start: 7, end: 11, prefix: '上午' },
    { start: 12, end: 14, prefix: '中午' },
    { start: 15, end: 18, prefix: '下午' },
    { start: 19, end: 24, prefix: '晚上' },
  ];
  const range = ranges.find(({ start, end }) => hour >= start && hour <= end);
  return range ? range.prefix : '';
};

// date -> YYYY-MM-DD 中午
const formatDateToYMDHm = (
  date: Date,
  separator: DateSeparatorType,
): string => {
  const ymd = formatDateToYMD(date, separator);
  const prefix = getHourPrefix(date.getHours());
  return `${ymd} ${prefix}`;
};

// 返回相对时间字符串
const formatToRelativeTime = (date: Date): string => {
  const seconds = (Date.now() - date.getTime()) / 1000;
  const minutes = 60;
  const hours = minutes * 60;
  const days = hours * 24;
  const weeks = days * 7;
  const months = days * 30;
  const years = months * 12;

  const intervals = [
    { seconds: years, label: '年' },
    { seconds: months, label: '月' },
    { seconds: weeks, label: '周' },
    { seconds: days, label: '天' },
    { seconds: hours, label: '小时' },
    { seconds: minutes, label: '分钟' },
  ];

  const interval = intervals.find((i) => seconds >= i.seconds);
  return interval
    ? `${Math.floor(seconds / interval.seconds)} ${interval.label}前`
    : '刚刚';
};

export const formatDate = (
  dateInput: string | Date | number,
  transformType: DateTransformType = 'YMDHm',
  separator: DateSeparatorType = '-',
): string | null => {
  const date = parseToDate(dateInput);
  if (!date) return '无效的日期';

  switch (transformType) {
    case 'YMD':
      return formatDateToYMD(date, separator);
    case 'YMDHm':
      return formatDateToYMDHm(date, separator);
    case 'ago':
      return formatToRelativeTime(date);
    default:
      return null;
  }
};
