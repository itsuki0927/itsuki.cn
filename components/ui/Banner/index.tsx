import { ReactNode } from 'react';
import Container from '../Container';

type BannerProps = {
  className?: string;
  children?: ReactNode;
};

const Banner = ({ className, children }: BannerProps) => (
  <Container className={`relative overflow-hidden text-center ${className}`}>
    <h1 className='text-xs tracking-wider text-gray-3'>{children}</h1>
  </Container>
);

export default Banner;
