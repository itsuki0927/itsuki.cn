import React, { FC } from 'react';
import { useGlobalData } from '@/hooks/globalData';
import { Navbar } from '..';
import { PageProps } from '../Layout';
import Footer from '../Footer';

const NavbarLayout: FC<PageProps> = ({ children }) => {
  const { data } = useGlobalData();

  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar links={data?.categories} />
      <main className='container'>{children}</main>
      <Footer />
    </div>
  );
};

export default NavbarLayout;
