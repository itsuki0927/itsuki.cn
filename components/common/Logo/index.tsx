import { LogoJsonLd } from 'next-seo';
import router from 'next/router';
import { MyImage } from '..';

const Logo = () => (
  <div
    className='flex h-full cursor-pointer items-center overflow-hidden'
    role='img'
    aria-hidden='true'
    onClick={() => router.push('/')}
  >
    <MyImage
      src='https://static.itsuki.cn/logo.png'
      objectFit='cover'
      width={120}
      height={120}
      alt='logo'
      className='h-full'
    />
    <LogoJsonLd logo='https://static.itsuki.cn/logo.png' url='https://itsuki.cn' />
  </div>
);

export default Logo;
