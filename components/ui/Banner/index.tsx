import React, { ReactElement, ReactNode } from 'react';
import Container from '../Container';

type BannerProps = {
  className?: string;
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactElement;
};

const Banner = ({ className, title, description, icon }: BannerProps) => (
  <Container className={className}>
    <div className='flex items-center justify-between'>
      <div className='pr-4'>
        <h1 className='mb-4 text-3xl font-medium tracking-tight text-dark-2 md:text-3xl'>
          {title}
        </h1>
        <p className='text-dark-1'>{description}</p>
      </div>

      {icon &&
        React.cloneElement(icon, {
          className: `${icon.props.className} min-w-min animate-bounce text-4xl text-gray-3`,
        })}
    </div>
  </Container>
);

export default Banner;
