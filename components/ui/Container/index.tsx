import { CSSProperties, forwardRef, PropsWithChildren } from 'react';

type ContainerProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
  id?: string;
}>;

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, style, className = '', ...rest }, ref) => (
    <div {...rest} ref={ref} className={`rounded-sm p-4 ${className}`} style={style}>
      {children}
    </div>
  )
);

export default Container;
