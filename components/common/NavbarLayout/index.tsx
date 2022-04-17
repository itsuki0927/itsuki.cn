import React, { PropsWithChildren } from 'react';
import { useGlobalData } from '@/hooks/globalData';
import { Navbar } from '..';
import { PageProps } from '../Layout';
import Footer from '../Footer';

const NavbarLayout = ({ children }: PropsWithChildren<PageProps>) => {
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
