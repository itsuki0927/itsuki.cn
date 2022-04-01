import React, { FC } from 'react';
import { Footer, Navbar, Sidebar } from '@/components/common';
import { BackTop } from '@/components/ui';
import { SiteInfo } from '@/entities/siteInfo';
import { useGlobalData } from '@/hooks/globalData';

export interface PageProps {
  pageProps: {
    pages?: any[];
    categories: SiteInfo['categories'];
    tags: SiteInfo['tags'];
    siteInfo: SiteInfo['siteInfo'];
    hotArticles: SiteInfo['hotArticles'];
  };
}

const Layout: FC<PageProps> = ({ children, pageProps }) => {
  const { categories = [], tags = [], hotArticles = [] } = pageProps;
  const { data } = useGlobalData();

  return (
    <>
      <div className='flex min-h-screen flex-col'>
        <Navbar links={data?.categories || categories} />

        <main className='container mx-auto mb-6 mt-[88px] flex flex-grow space-x-6'>
          <section className='max-w-[856px] flex-grow'>{children}</section>
          <Sidebar
            className='w-80 space-y-6'
            tags={data?.tags || tags}
            hotArticles={data?.hotArticles || hotArticles}
          />
        </main>

        <Footer />
      </div>
      <BackTop />
    </>
  );
};

export default Layout;
