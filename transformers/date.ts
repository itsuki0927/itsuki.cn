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
