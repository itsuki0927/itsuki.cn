import { useEffect, useState } from 'react';
import { getOffset, Offset } from '@/utils';

/**
 * 获取 容器元素的 offset
 * @param container
 * @returns
 */
const useContainerOffset = (container?: HTMLElement | (() => HTMLElement)) => {
  const [offset, setOffset] = useState<Offset | null>(null);

  useEffect(() => {
    const node = typeof container === 'function' ? container() : container;
    setOffset(node ? getOffset(node) : null);
  }, [container]);

  return offset;
};
export default useContainerOffset;
