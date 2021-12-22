import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { Footer, Navbar, Sidebar } from '@/components/common';
import { SiteInfo } from '@/entities/siteInfo';
import { BlogProvider } from '@/framework/local';
import styles from './style.module.scss';

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

const DynamicAffix = dynamic(() => import('@/components/ui/Affix'), { ssr: false });

const Layout: FC<PageProps> = ({
  children,
  pageProps = { categories: [], tags: [], hotArticles: [] },
}) => {
  const { locale = 'zh-cn' } = useRouter();

  return (
    <BlogProvider locale={locale}>
      <div className={styles.app}>
        <Navbar links={pageProps.categories} />

        <section className={styles.main}>
          <main className={styles.mainContent}>{children}</main>
          <DynamicAffix top={88}>
            <Sidebar tags={pageProps.tags} hotArticles={pageProps.hotArticles} />
          </DynamicAffix>
        </section>

        <Footer />
      </div>
      <DynamicBackTop />
    </BlogProvider>
  );
};

export default Layout;
