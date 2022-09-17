import { forwardRef } from 'react';
import { WithAsProps } from '@/types/common';

export interface ContainerProps extends WithAsProps {
  id?: string;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, style, as: Component = 'div', className = '', ...rest }, ref) => (
    <Component {...rest} ref={ref} className={`container ${className}`} style={style}>
      {children}
    </Component>
  )
);

export default Container;
