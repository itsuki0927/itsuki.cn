import { EmptyFunction } from '@/types/fn';
import { useEffect } from 'react';

/**
 * componentDidUnMount
 *
 * @param onUnMountHandler 处理函数
 */
const useUnMount = (onUnMountHandler: EmptyFunction) => {
  useEffect(
    () => () => {
      onUnMountHandler();
    },
    []
  );
};
export default useUnMount;
