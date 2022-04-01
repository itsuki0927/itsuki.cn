import { CSSProperties, ElementType, ReactNode } from 'react';
import { UseQueryResult } from 'react-query';
import { Empty } from '@/components/ui';

export type HijackRenderProps<T> = UseQueryResult<T> & {
  children: ReactNode;
  loadingContent?: ReactNode;
  errorContent?: ReactNode;
  idleContent?: ReactNode;
  emptyContent?: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: ElementType | string;
  showEmpty?: boolean;
};

const defaultLoading = (
  <div className='bg-white p-4 text-center'>
    <h1>Loading</h1>
  </div>
);

const defaultError = (
  <div className='bg-white p-4 text-center text-red-400'>
    <h1>Error...</h1>
  </div>
);

const defaultIdle = (
  <div className='bg-white p-4 text-center text-gray-500'>
    <h1>Idle...</h1>
  </div>
);

const defaultEmpty = <Empty />;

function HijackRender<T>({
  isLoading,
  isIdle,
  isError,
  data,
  children,
  loadingContent = defaultLoading,
  errorContent = defaultError,
  idleContent = defaultIdle,
  emptyContent = defaultEmpty,
  as: Component = 'div',
  showEmpty = true,
  ...rest
}: HijackRenderProps<T>) {
  if (isLoading) {
    return <>{loadingContent}</>;
  }

  if (isError) {
    return <>{errorContent}</>;
  }

  if (isIdle) {
    return <>{idleContent}</>;
  }

  if (Array.isArray(data) && data.length === 0 && showEmpty) {
    return <>{emptyContent}</>;
  }

  return <Component {...rest}>{children}</Component>;
}

export default HijackRender;
