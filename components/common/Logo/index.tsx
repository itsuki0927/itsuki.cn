import { LogoJsonLd } from 'next-seo';
import Image from 'next/image';
import router from 'next/router';
import logo from '../../../public/logo.png';

const Logo = () => (
  <div
    className='flex h-full cursor-pointer items-center overflow-hidden'
    role='img'
    aria-hidden='true'
    onClick={() => router.push('/')}
  >
    <Image
      src={logo}
      objectFit='cover'
      width={120}
      height={120}
      alt='logo'
      className='h-8'
    />
    <LogoJsonLd logo='https://static.itsuki.cn/logo.png' url='https://itsuki.cn' />
  </div>
);

export default Logo;
