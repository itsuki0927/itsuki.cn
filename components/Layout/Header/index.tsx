import ActiveLink from '@/components/ActiveLink';
import AppContext from '@/utils/context';
import { useContext, useMemo } from 'react';
import Logo from '../Logo';
import HeaderSearch from '../Search';
import styles from './style.module.scss';

const buildPath = (path: string) => `/${path}`;

const Header = () => {
  const context = useContext(AppContext);

  const categoriesDom = useMemo(() => {
    return context?.categories?.map(item => (
      <ActiveLink activeClassName={styles.active} key={item.id} href={buildPath(item.path)}>
        <li className={styles.item}>
          <span>{item.name}</span>
        </li>
      </ActiveLink>
    ));
  }, [context?.categories]);

  return (
    <header className={styles.header}>
      <div className={`${styles.main} container`}>
        <Logo />
        <HeaderSearch />
        <nav className={styles.navbar}>
          <ul>
            <ActiveLink activeClassName={styles.active} href='/'>
              <li className={styles.item}>
                <span>首页</span>
              </li>
            </ActiveLink>
            {categoriesDom}
            <ActiveLink activeClassName={styles.active} href='/code'>
              <li className={styles.item}>
                <span>Code</span>
              </li>
            </ActiveLink>
            <ActiveLink activeClassName={styles.active} href='/music'>
              <li className={styles.item}>
                <span>音乐</span>
              </li>
            </ActiveLink>
            <ActiveLink activeClassName={styles.active} href='/archive'>
              <li className={styles.item}>
                <span>归档</span>
              </li>
            </ActiveLink>
            <ActiveLink activeClassName={styles.active} href='/about'>
              <li className={styles.item}>
                <span>关于</span>
              </li>
            </ActiveLink>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
