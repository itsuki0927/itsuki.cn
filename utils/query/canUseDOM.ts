// 是否可以使用 dom
const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export default canUseDOM;
