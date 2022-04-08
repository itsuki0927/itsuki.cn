import { CSSProperties, ReactNode } from 'react';

interface ContainerProps {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
}

const Container = ({ children, style, className }: ContainerProps) => (
  <div className={`bg-white p-4 dark:bg-white--dark ${className}`} style={style}>
    {children}
  </div>
);

export default Container;
