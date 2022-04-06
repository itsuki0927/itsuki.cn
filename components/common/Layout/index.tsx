import React, { FC } from 'react';
import { Footer, Navbar, Sidebar } from '@/components/common';
import { BackTop } from '@/components/ui';
import { useGlobalData } from '@/hooks/globalData';

// TODO: 深色主题、中英文
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PageProps {}

const Layout: FC<PageProps> = ({ children }) => {
  const { data } = useGlobalData();

  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar links={data?.categories || []} />

      <main className='mx-auto mb-6 flex flex-grow space-x-5'>
        <section className='w-[695px] flex-grow'>{children}</section>
        <Sidebar
          className='w-[335px] space-y-5'
          tags={data?.tags || []}
          hotArticles={data?.hotArticles || []}
        />
      </main>

      <Footer />
      <BackTop />
    </div>
  );
};

export default Layout;
