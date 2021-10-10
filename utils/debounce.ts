/**
 * 防抖
 *
 * @param cb
 * @param wait
 * @returns
 */
function debounce(cb: any, wait: number) {
  let timer = 0;
  return (...args: any) => {
    clearTimeout(timer);
    timer = window.setTimeout(() => cb(...args), wait);
  };
}

export default debounce;
