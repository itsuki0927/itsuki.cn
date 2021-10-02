import logoImg from '@/public/logo.png';
import Image from 'next/image';
import router from 'next/router';
import styles from './style.module.scss';

const Logo = () => {
  return (
    <div className={styles.logo} onClick={() => router.push('/')}>
      <Image src={logoImg} alt='logo' className={styles.img} />
      <span>Itsuki</span>
    </div>
  );
};

export default Logo;
