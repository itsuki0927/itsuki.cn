import { ReactNode } from 'react';

type BannerProps = {
  className?: string;
  children?: ReactNode;
};

const Banner = ({ className, children }: BannerProps) => (
  <div className={`relative overflow-hidden bg-white p-4 text-center ${className}`}>
    <h1 className='text-xs tracking-wider text-[#6f6f6f]'>{children}</h1>
  </div>
);

export default Banner;
