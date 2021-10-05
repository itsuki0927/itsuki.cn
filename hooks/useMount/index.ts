import { EmptyFunction } from '@/types/fn';
import { useEffect } from 'react';

/**
 * componentDidMount
 *
 * @param onMountHandler 处理函数
 */
const useMount = (onMountHandler: EmptyFunction) => {
  useEffect(() => {
    onMountHandler();
  }, []);
};
export default useMount;
