import classNames from 'classnames';
import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { BlogProvider } from '@/framework/local';
import { Navbar } from '..';
import { PageProps } from '../Layout';
import styles from './style.module.scss';
import { useGlobalData } from '@/hooks/globalData';

const NavbarLayout: FC<PageProps> = ({ children }) => {
  const { locale = 'zh-cn' } = useRouter();
  const { data } = useGlobalData();

  return (
    <BlogProvider locale={locale}>
      <div className={styles.navbarLayout}>
        <Navbar search={false} links={data?.categories} />
        <main className={classNames(styles.main, 'container')}>{children}</main>
      </div>
    </BlogProvider>
  );
};

export default NavbarLayout;
