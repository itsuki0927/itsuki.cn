import React, { ReactNode } from 'react';
import Container from '../Container';

type BannerProps = {
  className?: string;
  title?: ReactNode;
  description?: ReactNode;
};

const Banner = ({ className, title, description }: BannerProps) => (
  <Container className={className}>
    <div className='flex items-center justify-between'>
      <div className='flex-grow'>
        <h1 className='mb-4 text-center text-3xl font-medium tracking-tight text-dark-2 md:text-3xl'>
          {title}
        </h1>
        <p className='text-center text-dark-1'>{description}</p>
      </div>
    </div>
  </Container>
);

export default Banner;
