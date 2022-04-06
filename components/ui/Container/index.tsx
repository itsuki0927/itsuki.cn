import { CSSProperties, ReactNode } from 'react';

interface ContainerProps {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
}

const Container = ({ children, style, className }: ContainerProps) => (
  <div className={`bg-white p-4 ${className}`} style={style}>
    {children}
  </div>
);

export default Container;
