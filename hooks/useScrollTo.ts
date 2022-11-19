'use client';

import { useCallback, useRef } from 'react';
import { useSpring, SpringConfig } from '@react-spring/web';

const useScrollTo = (config?: SpringConfig) => {
  const [, api] = useSpring(() => ({ y: 0 }));
  const isStopped = useRef(false);

  const onWheel = useCallback(() => {
    isStopped.current = true;
    window.removeEventListener('wheel', onWheel);
  }, []);

  const scrollTo = useCallback(
    (value?: Element | number | string | null, offset = 0) => {
      let y = 0;

      let target: Element | null = null;
      if (typeof value === 'number') {
        y = value;
      } else if (typeof value === 'string' || value?.nodeType === 1) {
        if (typeof value === 'string') {
          value = value.startsWith('#') ? value : `#${value}`;
          target = document.querySelector(value);
        }
        if (!target) {
          console.error(`[useScrollTo]: Element not found, id:${value}`);
        } else {
          y = window.scrollY + target.getBoundingClientRect().top;
        }
      }

      y += offset;

      window.addEventListener('wheel', onWheel);

      api.start({
        y,
        reset: true,
        from: { y: window.scrollY },
        config,
        onRest: () => {
          isStopped.current = false;
          window.removeEventListener('wheel', onWheel);
        },
        onChange: (_, ctrl) => {
          if (!isStopped.current) {
            window.scroll(0, ctrl.get().y);
          }
        },
      });
    },
    [api, config, onWheel]
  );

  return { scrollTo } as const;
};

export default useScrollTo;
