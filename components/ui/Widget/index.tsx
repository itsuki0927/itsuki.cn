import { FC, ReactNode } from 'react';
import Container from '../Container';

interface WidgetProps {
  className?: string;
  children?: ReactNode;
  // eslint-disable-next-line react/no-unused-prop-types
  id?: string;
}

const Header = ({ className = '', children }: WidgetProps) => (
  <h3 className={`my-3 pb-2 font-medium tracking-widest ${className}`}>{children}</h3>
);

const Widget: FC<WidgetProps> & {
  Header: typeof Header;
} = ({ className, children, id }: WidgetProps) => (
  <Container className={className ?? ''} id={id}>
    {children}
  </Container>
);

Widget.Header = Header;

export default Widget;
