import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { Footer, Header, Sidebar } from '@/components/common';
import { BlogProvider } from '@/framework/local';
import styles from './style.module.scss';
import { SiteInfo } from '@/entities/siteInfo';

const DynamicBackTop = dynamic(() => import('@/components/ui/BackTop'));

interface Props {
  pageProps: {
    pages?: any[];
    categories: SiteInfo['categories'];
    tags: SiteInfo['tags'];
    siteInfo: SiteInfo['siteInfo'];
  };
}

const DynamicAffix = dynamic(() => import('@/components/ui/Affix'), { ssr: false });

const Layout: FC<Props> = ({ children, pageProps = { categories: [], tags: [] } }) => {
  const { locale = 'zh-cn' } = useRouter();

  return (
    <BlogProvider locale={locale}>
      <Header links={pageProps.categories} />
      <main className={styles.main}>
        <div className={styles.mainContent}>{children}</div>
        <DynamicAffix top={88}>
          <Sidebar tags={pageProps.tags} />
        </DynamicAffix>
      </main>
      <Footer />

      <DynamicBackTop />
    </BlogProvider>
  );
};

export default Layout;
