import Link from 'next/link';
import { LogoJsonLd } from 'next-seo';
import { RESOURCE_URL, WEB_URL } from '@/configs/app';
import { MyImage } from '..';

const Logo = () => (
  <Link href='/'>
    <>
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
    </>
  </Link>
);

export default Logo;
