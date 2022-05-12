import { CSSProperties, forwardRef, PropsWithChildren } from 'react';

type ContainerProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
}>;

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, style, className = '' }, ref) => (
    <div ref={ref} className={`rounded-sm bg-white p-4  ${className}`} style={style}>
      {children}
    </div>
  )
);

export default Container;
