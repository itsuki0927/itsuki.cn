import UAParser from 'ua-parser-js';

const parser = new UAParser();

/**
 * 通过ua解析出browser系统
 *
 * @param ua ua
 * @returns os
 */
export const parserBrowser = (ua: string) => {
  parser.setUA(ua);
  const browser = parser.getBrowser();
  if (!browser.name && !browser.version) {
    return ua;
  }
  return `${browser.name || '未知'} ${browser.version || '未知'}`;
};

/**
 * 通过ua解析出os系统
 *
 * @param ua ua
 * @returns os
 */
export const parserOS = (ua: string) => {
  parser.setUA(ua);
  const os = parser.getOS();
  if (!os.name && !os.version) {
    return ua;
  }
  return `${os.name || '未知'} ${os.version || '未知'}`;
};
