import { CustomEventListener } from './on';

/**
 * 给元素节点移除事件
 *
 * @param target 元素节点
 * @param eventType 事件名
 * @param listener 事件处理函数
 * @param options 其他参数
 * @returns
 */
function off<K extends keyof DocumentEventMap>(
  target: Document | Element | EventTarget | Window,
  eventType: K,
  listener: EventListenerOrEventListenerObject | CustomEventListener,
  options: boolean | AddEventListenerOptions = false
) {
  target.removeEventListener(eventType, listener, options);
}

export default off;
