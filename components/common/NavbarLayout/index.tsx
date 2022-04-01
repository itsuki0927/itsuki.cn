import classNames from 'classnames';
import React, { FC } from 'react';
import { Navbar } from '..';
import { PageProps } from '../Layout';
import styles from './style.module.scss';
import { useGlobalData } from '@/hooks/globalData';

const NavbarLayout: FC<PageProps> = ({ children }) => {
  const { data } = useGlobalData();

  return (
    <div className={styles.navbarLayout}>
      <Navbar search={false} links={data?.categories} />
      <main className={classNames(styles.main, 'container')}>{children}</main>
    </div>
  );
};

export default NavbarLayout;
