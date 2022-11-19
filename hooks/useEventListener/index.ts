'use client';

import { useEffect } from 'react';
import { on } from '@/utils/events';

/**
 * 给元素绑定事件
 *
 * @param eventTarget 元素
 * @param event 事件名
 * @param listener 处理事件
 * @param options 其他参数
 */
function useEventListener<K extends keyof DocumentEventMap>(
  eventTarget: EventTarget | (() => EventTarget),
  event: K,
  listener: EventListenerOrEventListenerObject,
  options: boolean | AddEventListenerOptions = false
) {
  useEffect(() => {
    const target = typeof eventTarget === 'function' ? eventTarget() : eventTarget;
    const controller = target ? on(target, event, listener, options) : null;

    return () => {
      controller?.off();
    };
  }, [event, eventTarget, listener, options]);
}

export default useEventListener;
