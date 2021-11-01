import Image from 'next/image';
import router from 'next/router';
import styles from './style.module.scss';

const Logo = () => (
  <div
    className={styles.logo}
    role='img'
    aria-hidden='true'
    onClick={() => router.push('/')}
  >
    <Image src='/logo.png' width={32} height={32} alt='logo' className={styles.img} />
    <span>Itsuki</span>
  </div>
);

export default Logo;
