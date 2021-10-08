import { useEffect } from 'react';
import { EmptyFunction } from '@/types/fn';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
};
export default useUnMount;
