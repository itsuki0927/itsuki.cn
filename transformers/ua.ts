import UAParser from 'ua-parser-js';

/**
 * 通过ua解析出browser系统
 *
 * @param ua ua
 * @returns os
 */
const parseUA = (ua: string) => {
  const parseResult = UAParser(ua || '');
  const browserName = String(parseResult.browser.name).toLowerCase();
  const isTargetDevice = (browsers: string[]) =>
    browsers.some(browser => browser.toLowerCase() === browserName);

  return {
    result: parseResult,
    isIE: isTargetDevice(['compatible', 'MSIE', 'IE']),
    isEdge: isTargetDevice(['Edge']),
    isFirefox: isTargetDevice(['Firefox']),
    isChrome: isTargetDevice(['Chrome', 'Chromium']),
    isSafari: isTargetDevice(['Safari']),
    isWechat: isTargetDevice(['Wechat']),
    isIos: parseResult.os.name === 'iOS',
    isAndroid: parseResult.os.name === 'Android',
    isMobile: parseResult.device.type === 'mobile',
  };
};

export default parseUA;
