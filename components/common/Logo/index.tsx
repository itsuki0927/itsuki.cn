import { LogoJsonLd } from 'next-seo';
import router from 'next/router';
import { RESOURCE_URL, WEB_URL } from '@/configs/app';
import { MyImage } from '..';

const Logo = () => (
  <div
    className='cursor-pointer overflow-hidden'
    role='img'
    aria-hidden='true'
    onClick={() => router.push('/')}
  >
    <MyImage
      src='/logo.png'
      objectFit='cover'
      width={60}
      height={60}
      unoptimized
      alt='logo'
      className='h-full'
    />
    <LogoJsonLd logo={`${RESOURCE_URL}/logo.png`} url={WEB_URL} />
  </div>
);

export default Logo;
