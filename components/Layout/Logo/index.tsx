import Image from 'next/image';
import logoImg from '../../../public/logo.png';
import styles from './style.module.scss';

const Logo = () => {
  return (
    <div className={styles.logo}>
      <Image src={logoImg} alt='logo' className={styles.img} />
      <span>Itsuki</span>
    </div>
  );
};

export default Logo;
