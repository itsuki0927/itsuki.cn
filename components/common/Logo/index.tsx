import Link from 'next/link';
import { LogoJsonLd } from 'next-seo';
import { WEB_URL } from '@/configs/app';
import { MyImage } from '..';

const Logo = () => (
  <Link href='/'>
    <a>
      <MyImage
        src='/logo.png'
        objectFit='cover'
        width={60}
        height={60}
        unoptimized
        alt='logo'
        className='h-full'
      />
      <LogoJsonLd logo='/logo.png' url={WEB_URL} />
    </a>
  </Link>
);

export default Logo;
