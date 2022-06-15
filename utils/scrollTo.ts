import { off, on } from './events';
import { getOffset, getWindow } from './query';

enum ElementEvent {
  scroll = 'scroll',
  mousedown = 'mousedown',
  wheel = 'wheel',
  DOMMouseScroll = 'DOMMouseScroll',
  mousewheel = 'mousewheel',
  keyup = 'keyup',
  touchmove = 'touchmove',
}
type ScrollEffect =
  | 'easeInOutCirc'
  | 'linearTween'
  | 'easeInQuad'
  | 'easeOutQuad'
  | 'easeInCubic'
  | 'easeInOutQuad';

type ScrollOptions = {
  onCancel?: () => void;
  onDone?: () => void;
  offset?: number;
  effect?: ScrollEffect;
};

function humanlize<T>(val: T | T[]) {
  return Array.isArray(val) ? val : [val];
}

const helper = {
  query(selector: string) {
    return document.querySelector(selector);
  },
  bind(element: Element, events: ElementEvent[], handler: () => void) {
    humanlize(events).forEach(event => {
      on(element, event as any, handler, { passive: true });
    });
  },
  unbind(element: Element, events: ElementEvent[], handler: () => void) {
    humanlize(events).forEach(event => {
      off(element, event as any, handler);
    });
  },
};

/**
 * 平滑滚动到指定位置
 *
 * @param target 滚动元素 | 滚动距离 | 滚动元素id
 * @param duration 执行时间
 * @param options 可选项
 * @returns
 */
const scrollTo = (
  target: number | string | Element,
  duration = 500,
  options: ScrollOptions = {}
) => {
  const startY = getWindow(window).scrollY;
  let elementY = 0;
  let startTime = 0;
  const page = helper.query('html, body')!;
  const events: ElementEvent[] = [
    ElementEvent.scroll,
    ElementEvent.mousedown,
    ElementEvent.wheel,
    ElementEvent.DOMMouseScroll,
    ElementEvent.mousewheel,
    ElementEvent.keyup,
    ElementEvent.touchmove,
  ];

  if (typeof target === 'number') {
    elementY = target;
  } else {
    const element = typeof target === 'string' ? helper.query(target)! : target;
    elementY = getOffset(element)?.top ?? 0;
  }

  let targetY =
    document.body.scrollHeight - elementY < window.innerHeight
      ? document.body.scrollHeight - elementY
      : elementY;

  if (options?.offset) {
    targetY += options.offset;
  }

  const distance = targetY - startY;

  if (!distance) return;

  let abort = false;
  function abortFn() {
    abort = true;
  }

  helper.bind(page, events, abortFn);
  const effect = options?.effect ?? 'linearTween';

  function ease(t: number, b: number, c: number, d: number) {
    switch (effect) {
      case 'easeInOutCirc':
        t /= d / 2;
        if (t < 1) return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b;
        t -= 2;
        return (c / 2) * (Math.sqrt(1 - t * t) + 1) + b;
      case 'linearTween':
        return (c * t) / d + b;
      case 'easeInQuad':
        t /= d;
        return c * t * t + b;
      case 'easeOutQuad':
        t /= d;
        return -c * t * (t - 2) + b;
      case 'easeInCubic':
        t /= d;
        return c * t * t * t + b;
      // easeInOutQuad
      default:
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        // eslint-disable-next-line no-plusplus
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
    }
  }

  function done() {
    helper.unbind(page, events, abortFn);
    if (abort && options.onCancel) {
      options.onCancel();
    }
    if (!abort && options.onDone) {
      options.onDone();
    }
  }

  function step(currentTime: number) {
    currentTime = currentTime || Date.now();
    if (!startTime) {
      startTime = currentTime;
    }
    const timeElapsed = currentTime - startTime;
    const scroll = ease(timeElapsed, startY, distance, duration);
    window.scrollTo(0, scroll);

    if (timeElapsed < duration) {
      window.requestAnimationFrame(step);
    } else {
      done();
    }
  }

  window.requestAnimationFrame(step);
};

export default scrollTo;
