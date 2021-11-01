import React, { FC } from 'react';
import { BlankLayout, Navbar } from '..';
import { PageProps } from '../Layout';

const NavbarLayout: FC<PageProps> = ({ pageProps, children }) => (
  <BlankLayout>
    <Navbar search={false} links={pageProps.categories} />
    {children}
  </BlankLayout>
);

export default NavbarLayout;
