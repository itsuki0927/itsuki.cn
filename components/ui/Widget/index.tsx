import { FC, ReactNode } from 'react';
import Container from '../Container';

interface WidgetProps {
  className?: string;
  children?: ReactNode;
}

const Header = ({ className = '', children }: WidgetProps) => (
  <h3 className={`my-3 pb-2 text-center text-xs tracking-widest ${className}`}>
    {children}
  </h3>
);

const Widget: FC<WidgetProps> & {
  Header: typeof Header;
} = ({ className, children }: WidgetProps) => (
  <Container className={className ?? ''}>{children}</Container>
);

Widget.Header = Header;

export default Widget;
