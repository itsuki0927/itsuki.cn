import { useSpring, SpringConfig } from '@react-spring/web';

const useScrollTo = (config?: SpringConfig) => {
  const [, api] = useSpring(() => ({ y: 0 }));

  let isStopped = false;
  const onWheel = () => {
    isStopped = true;
    window.removeEventListener('wheel', onWheel);
  };

  const scrollTo = (value?: Element | number | string | null, offset = 0) => {
    let y = 0;

    let target: Element | null = null;
    if (typeof value === 'number') {
      y = value;
    } else if (typeof value === 'string' || value?.nodeType === 1) {
      if (typeof value === 'string') {
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
        isStopped = false;
        window.removeEventListener('wheel', onWheel);
      },
      onChange: (_, ctrl) => {
        if (!isStopped) {
          window.scroll(0, ctrl.get().y);
        }
      },
    });
  };

  return { scrollTo } as const;
};

export default useScrollTo;
