/**
 * 执行函数
 *
 * @param cb 函数
 * @param args 函数参数
 */
const apply = (cb?: (...args: any[]) => void, ...args: any[]) => {
  if (cb) {
    cb(...args);
  }
};
export default apply;
