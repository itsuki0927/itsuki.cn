import { useCallback, useState } from 'react';
import { useEventListener, useMount } from '@/hooks';
import getOffset, { Offset } from '@/utils/query/getOffset';

/**
 * 获取 mount 元素的offset
 * @param mountRef
 * @returns
 */
const useOffset = (mountRef: React.RefObject<HTMLDivElement>) => {
  const [offset, setOffset] = useState<Offset | null>(null);

  const updateOffset = useCallback(() => {
    setOffset(getOffset(mountRef.current!));
  }, [mountRef]);

  useEventListener(() => window, 'resize', updateOffset);

  useMount(updateOffset);

  return offset;
};

export default useOffset;
