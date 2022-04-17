/**
 * 防抖
 *
 * @param cb
 * @param wait
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
function debounce(func, wait, immediate = false) {
  let timeout;
  let result;

  const debounced = function (...args) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    if (immediate) {
      const callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) result = func.apply(context, args);
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
    return result;
  };

  debounced.cancel = () => {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
}

export default debounce;
