import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { Footer, Navbar, Sidebar } from '@/components/common';
import { SiteInfo } from '@/entities/siteInfo';
import { BlogProvider } from '@/framework/local';

const DynamicBackTop = dynamic(() => import('@/components/ui/BackTop'));

export interface PageProps {
  pageProps: {
    pages?: any[];
    categories: SiteInfo['categories'];
    tags: SiteInfo['tags'];
    siteInfo: SiteInfo['siteInfo'];
    hotArticles: SiteInfo['hotArticles'];
  };
}

const Layout: FC<PageProps> = ({
  children,
  pageProps = { categories: [], tags: [], hotArticles: [] },
}) => {
  const { locale = 'zh-cn' } = useRouter();

  return (
    <BlogProvider locale={locale}>
      <div className='flex min-h-screen flex-col'>
        <Navbar links={pageProps.categories} />

        <main className='container mx-auto mb-6 mt-[88px] flex space-x-6'>
          <section className='max-w-[856px] flex-grow'>{children}</section>
          <Sidebar
            className='w-80 space-y-6'
            tags={pageProps.tags}
            hotArticles={pageProps.hotArticles}
          />
        </main>

        <Footer />
      </div>
      <DynamicBackTop />
    </BlogProvider>
  );
};

export default Layout;
