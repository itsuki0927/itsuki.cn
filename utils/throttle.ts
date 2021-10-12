/* eslint-disable */
// @ts-nocheck
const throttle = (func = () => {}, wait = 1000, options = {}) => {
  let context = null;
  let args = null;
  let result = null;
  let timer = null;
  let previous = 0;

  const later = function () {
    previous = options.leading === false ? 0 : +new Date();
    timer = null;
    result = func.apply(context, args);
    if (!timer) {
      context = null;
      args = null;
    }
  };

  return function () {
    context = this;
    args = [...arguments];
    const now = +new Date();
    if (options.leading === false && !previous) previous = now;
    const remaining = wait - (now - previous);
    if (remaining < 0 || remaining > wait) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      result = func.apply(context, args);
      previous = now;
      if (!timer) {
        context = null;
        args = null;
      }
    } else if (options.tailing !== false && !timer) {
      timer = setTimeout(later, remaining);
    }

    return result;
  };
};

export default throttle;
