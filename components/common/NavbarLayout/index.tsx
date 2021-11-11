import classNames from 'classnames';
import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { BlogProvider } from '@/framework/local';
import { Navbar } from '..';
import { PageProps } from '../Layout';
import styles from './style.module.scss';

const NavbarLayout: FC<PageProps> = ({ pageProps, children }) => {
  const { locale = 'zh-cn' } = useRouter();
  return (
    <BlogProvider locale={locale}>
      <div className={styles.navbarLayout}>
        <Navbar search={false} links={pageProps.categories} />
        <main className={classNames(styles.main, 'container')}>{children}</main>
      </div>
    </BlogProvider>
  );
};

export default NavbarLayout;
