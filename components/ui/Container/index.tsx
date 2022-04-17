import { CSSProperties, forwardRef, PropsWithChildren } from 'react';

type ContainerProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
}>;

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, style, className }, ref) => (
    <div
      ref={ref}
      className={`bg-white p-4 dark:bg-white--dark ${className}`}
      style={style}
    >
      {children}
    </div>
  )
);

export default Container;
