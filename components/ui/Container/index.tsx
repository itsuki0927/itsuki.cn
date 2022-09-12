import { CSSProperties, forwardRef, PropsWithChildren } from 'react';

type ContainerProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
  id?: string;
}>;

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, style, className = '', ...rest }, ref) => (
    <div {...rest} ref={ref} className={`container ${className}`} style={style}>
      {children}
    </div>
  )
);

export default Container;
