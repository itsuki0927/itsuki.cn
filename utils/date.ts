export const wrapToDate = (date: string | Date) =>
  typeof date === 'string' ? new Date(date) : date;

/**
 * 获取日期字符串
 *
 * @param date 日期字符串
 * @returns 日期字符串
 */
export const getLocalString = (dateString: string | Date) =>
  wrapToDate(dateString).toLocaleDateString();

const pad = (val: any) => String(val).padStart(2, '0');

// date -> YY-MM-DD
export const dateToYMD = (date: Date, separator = '-') => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return [year, pad(month), pad(day)].join(separator);
};

const getDateSuffix = (date: Date) => {
  const hour = date.getHours();
  const hFnMap = new Map([
    [(h: number) => h > 0 && h < 7, '凌晨'],
    [(h: number) => h > 7 && h < 12, '上午'],
    [(h: number) => h >= 12 && h <= 14, '中午'],
    [(h: number) => h > 14 && h <= 18, '下午'],
    [(h: number) => h > 18 && h <= 24, '晚上'],
  ]);
  const item = [...hFnMap].find(([fn]) => fn(hour));
  return item ? item[1] : '';
};

export const dateToYMDm = (date: Date, separator = '-') => {
  const dateString = dateToYMD(date, separator);
  const suffix = getDateSuffix(date);

  return `${dateString} ${suffix}`;
};

// 比较两个日期相差的天数
export const getDaysDiffBetweenDates = (dateInitial: Date, dateFinal: Date) =>
  (dateFinal.getTime() - dateInitial.getTime()) / (1000 * 3600 * 24);

// 获取一个月的天数
export const daysInMonth = (month: number, year: number) =>
  new Date(year, month, 0).getDate();

// 获取日期在这一年是第多少天
export const daysOfYear = (date: Date) =>
  Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
  );

// 获取一年的天数
export const daysInYear = (year: number) => {
  if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
    // Leap year
    return 366;
  }
  // Not a leap year
  return 365;
};

export const getDayTotals = () => {
  const date = new Date();
  const hourInDay = date.getHours();
  const hourInDayTotal = 24;

  const dayInWeekTotal = 7;
  const dayInWeek = date.getDay();
  const dayInMonthTotal = daysInMonth(date.getMonth(), date.getFullYear());
  const dayInMonth = date.getDate();

  const dayInYear = daysOfYear(new Date());
  const dayInYearTotal = daysInYear(date.getFullYear());

  return {
    dayInWeek,
    dayInWeekTotal,
    dayInMonth,
    dayInMonthTotal,
    dayInYear,
    dayInYearTotal,
    hourInDay,
    hourInDayTotal,
  };
};
