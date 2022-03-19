import Image from 'next/image';
import router from 'next/router';
import { LogoJsonLd } from 'next-seo';
import imageTransformer from '@/utils/image';

const Logo = () => (
  <div
    className='h-16 overflow-hidden flex items-center cursor-pointer'
    role='img'
    aria-hidden='true'
    onClick={() => router.push('/')}
  >
    <Image
      src='/logo.png'
      loader={imageTransformer}
      width={32}
      height={32}
      alt='logo'
      className='h-8'
    />
    <LogoJsonLd logo='https://static.itsuki.cn/logo.png' url='https://itsuki.cn' />
    <span className='ml-3 text-primary leading-16'>Itsuki</span>
  </div>
);

export default Logo;
