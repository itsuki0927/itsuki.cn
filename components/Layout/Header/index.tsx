import Logo from '../Logo';
import Link from 'next/link';
import HeaderSearch from '../Search';
import styles from './style.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`${styles.main} container`}>
        <Logo />
        <HeaderSearch />
        <nav className={styles.navbar}>
          <ul>
            <li className={styles.item}>
              <Link href='/'>首页</Link>
            </li>
            <li className={styles.item}>
              <Link href='/'>何言</Link>
            </li>
            <li className={styles.item}>
              <Link href='/'>何语</Link>
            </li>
            <li className={styles.item}>
              <Link href='/'>Code</Link>
            </li>
            <li className={styles.item}>
              <Link href='/'>音乐</Link>
            </li>
            <li className={styles.item}>
              <Link href='/'>归档</Link>
            </li>
            <li className={styles.item}>
              <Link href='/'>关于</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
