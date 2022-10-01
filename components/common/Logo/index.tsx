import Link from 'next/link';
import { LogoJsonLd } from 'next-seo';
import { WEB_URL } from '@/configs/app';

const Logo = () => (
  <Link href='/'>
    <div className='flex cursor-pointer items-center'>
      <img src='/logo.png' className='h-8 w-8' alt='logo' />
      <span className='capsize ml-1 inline-block text-lg font-medium leading-8 text-primary'>
        五块木头
      </span>
      <LogoJsonLd logo='/logo.png' url={WEB_URL} />
    </div>
  </Link>
);

export default Logo;
