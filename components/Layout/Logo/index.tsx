import Image from 'next/image';
import router from 'next/router';
import logoImg from '@/public/logo.png';
import imageTransformer from '@/transformers/image';
import styles from './style.module.scss';

const Logo = () => (
  <div
    className={styles.logo}
    role='img'
    aria-hidden='true'
    onClick={() => router.push('/')}
  >
    <Image src={logoImg} loader={imageTransformer} alt='logo' className={styles.img} />
    <span>Itsuki</span>
  </div>
);

export default Logo;
