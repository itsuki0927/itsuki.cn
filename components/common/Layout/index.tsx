import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { Footer, Navbar, Sidebar } from '@/components/common';
import { BackTop } from '@/components/ui';
import { SiteInfo } from '@/entities/siteInfo';
import { BlogProvider } from '@/framework/local';
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
  const { locale = 'zh-cn' } = useRouter();
  const { data } = useGlobalData();

  return (
    <BlogProvider locale={locale}>
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
    </BlogProvider>
  );
};

export default Layout;
