const formatNumberWithPrecision = (value: number, precision = 1) =>
  value.toFixed(precision).replace(/\.?0+$/, "");

const CHINESE_YI = 100000000;
const CHINESE_WAN = 10000;
const ENGLISH_MILLION = 1000000;
const ENGLISH_THOUSAND = 1000;

export const prettifyNumber = (
  number: number,
  useChineseUnits = false,
): string => {
  let divisor: number;
  let unit: string;

  if (useChineseUnits) {
    if (Math.abs(number) >= CHINESE_YI) {
      divisor = CHINESE_YI;
      unit = "亿";
    } else if (Math.abs(number) >= CHINESE_WAN) {
      divisor = CHINESE_WAN;
      unit = "万";
    } else {
      return Intl.NumberFormat("zh-CN").format(number);
    }
  } else {
    if (Math.abs(number) >= ENGLISH_MILLION) {
      divisor = ENGLISH_MILLION;
      unit = "m";
    } else if (Math.abs(number) >= ENGLISH_THOUSAND) {
      divisor = ENGLISH_THOUSAND;
      unit = "k";
    } else {
      return Intl.NumberFormat("en-US").format(number);
    }
  }

  return formatNumberWithPrecision(number / divisor) + unit;
};

export default prettifyNumber;
