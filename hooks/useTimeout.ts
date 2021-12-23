import { useCallback, useEffect, useRef } from 'react';
import { EmptyFunction } from '@/types/fn';

/**
 * timer hook
 * @param fn 函数
 * @param ms 函数执行时间
 * @param open 是否立即执行函数
 */
const useTimeout = (fn: EmptyFunction, ms = 0, open = true) => {
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const fnRef = useRef<EmptyFunction>();

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  const clear = useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }, []);

  const set = useCallback(() => {
    if (open) {
      timeout.current = setTimeout(() => {
        if (fnRef.current) {
          fnRef.current();
        }
      }, ms);
    }
  }, [ms, open]);

  useEffect(() => {
    set();
    return clear;
  }, [ms, open, clear, set]);

  return { clear, reset: set } as const;
};

export default useTimeout;
