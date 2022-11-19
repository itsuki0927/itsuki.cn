'use client';

import { useEffect } from 'react';
import { EmptyFunction } from '@/types/fn';

/**
 * componentDidMount
 *
 * @param onMountHandler 处理函数
 */
const useMount = (onMountHandler: EmptyFunction) => {
  useEffect(() => {
    onMountHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
export default useMount;
