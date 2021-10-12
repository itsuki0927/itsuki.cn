export interface CustomEventListener<T = any> {
  (evt: T): void;
}

/**
 * 给元素节点绑定事件
 *
 * @param target 元素节点
 * @param eventType 事件名
 * @param listener 事件处理函数
 * @param options 其他参数
 * @returns {off}
 */
function on<K extends keyof DocumentEventMap>(
  target: Element | Window | Document | EventTarget,
  eventType: K,
  listener: EventListenerOrEventListenerObject | CustomEventListener,
  options: boolean | AddEventListenerOptions = false
) {
  target.addEventListener(eventType, listener, options);

  return {
    off() {
      target.removeEventListener(eventType, listener, options);
    },
  };
}

export default on;
