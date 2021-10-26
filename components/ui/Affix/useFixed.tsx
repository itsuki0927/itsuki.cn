import { useCallback, useState } from 'react';
import useEventListener from '@/hooks/useEventListener';
import { Offset } from '@/utils/query/getOffset';
import { AffixProps } from './index';
import throttle from '@/utils/throttle';

/**
 * 检查当前元素是否需要被fix
 */
const useFixed = (
  offset: Offset | null,
  containerOffset: Offset | null,
  props: AffixProps
) => {
  const { top = 0, onChange } = props;
  const [fixed, setFixed] = useState(false);

  const handleScroll = useCallback(() => {
    if (!offset) return;

    const scrollY = window.scrollY || window.pageYOffset;

    // 如果滚动距离 > 元素顶部时
    let nextFixed = scrollY - (offset?.top - top) >= 0;

    // 如果容器中指定了当前元素，
    // 添加判断当前容器是否在窗口范围内。
    // 如果指定了容器元素
    // 就判断当前容器是否在窗口范围内
    if (containerOffset) {
      nextFixed = nextFixed && scrollY < containerOffset?.height + containerOffset?.top;
    }

    if (nextFixed !== fixed) {
      setFixed(nextFixed);
      onChange?.(nextFixed);
    }
  }, [containerOffset, fixed, offset, onChange, top]);

  useEventListener(
    window,
    'scroll',
    throttle(handleScroll, 100, { leading: true }),
    false
  );

  return fixed;
};

export default useFixed;
