import Link from 'next/link';
import { LogoJsonLd } from 'next-seo';
import { WEB_URL } from '@/configs/app';

const Logo = () => (
  <Link href='/'>
    <div className='flex items-center'>
      <span className='inline-block h-6 w-6 bg-gray-200' />
      <LogoJsonLd logo='/logo.png' url={WEB_URL} />
      <span className='capsize ml-1 text-lg text-primary'>五块木头</span>
    </div>
  </Link>
);

export default Logo;
