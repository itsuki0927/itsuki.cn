import { useMemo } from 'react';
import { Logo, Search as HeaderSearch } from '@/components/common';
import { ActiveLink } from '@/components/ui';
import { Category } from '@/entities/category';
import styles from './style.module.scss';

const buildPath = (path: string) => `/category/${path}`;

interface HeaderProps {
  links?: Category[];
  search?: boolean;
}
const Header = ({ links, search = true }: HeaderProps) => {
  const categoriesDom = useMemo(
    () =>
      links?.map(item => (
        <ActiveLink
          activeClassName={styles.active}
          key={item.id}
          href={buildPath(item.path)}
        >
          <li className={styles.item}>
            <span>{item.name}</span>
          </li>
        </ActiveLink>
      )),
    [links]
  );

  return (
    <header className={styles.header}>
      <div className={`${styles.main} container`}>
        <Logo />
        {search ? <HeaderSearch /> : null}
        <nav className={styles.navbar}>
          <ul>
            <ActiveLink activeClassName={styles.active} href='/'>
              <li className={styles.item}>
                <span>首页</span>
              </li>
            </ActiveLink>
            {categoriesDom}
            <ActiveLink activeClassName={styles.active} href='/snippet'>
              <li className={styles.item}>
                <span>Snippet</span>
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
