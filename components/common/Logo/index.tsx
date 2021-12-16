import Image from 'next/image';
import router from 'next/router';
import { LogoJsonLd } from 'next-seo';
import imageTransformer from '@/utils/image';
import styles from './style.module.scss';

const Logo = () => (
  <div
    className={styles.logo}
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
      className={styles.img}
    />
    <LogoJsonLd logo='https://static.itsuki.cn/logo.png' url='https://itsuki.cn' />
    <span>Itsuki</span>
  </div>
);

export default Logo;
