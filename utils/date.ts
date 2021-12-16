/**
 * 获取周几
 *
 * @param date 日期
 * @param locale
 * @returns
 */
export const dayName = (date: Date, locale?: string | string[]) =>
  date.toLocaleDateString(locale, {
    weekday: 'long',
  });

/**
 *
 * @param date 日期
 * @returns 周几
 */
export const zhDayName = (date: Date) => dayName(date, 'zh-cn');

/**
 * 获取日期字符串
 *
 * @param date 日期字符串
 * @returns 日期字符串
 */
export const getDateString = (dateString: string | Date) =>
  new Date(dateString).toLocaleDateString();
