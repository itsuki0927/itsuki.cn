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
