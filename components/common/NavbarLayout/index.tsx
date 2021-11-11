import classNames from 'classnames';
import React, { FC } from 'react';
import { Navbar } from '..';
import { PageProps } from '../Layout';
import styles from './style.module.scss';

const NavbarLayout: FC<PageProps> = ({ pageProps, children }) => (
  <div className={styles.navbarLayout}>
    <Navbar search={false} links={pageProps.categories} />
    <main className={classNames(styles.main, 'container')}>{children}</main>
  </div>
);

export default NavbarLayout;
