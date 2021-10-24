import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { Footer, Header, Sidebar } from '@/components/common';
import { Category } from '@/entities/category';
import { Tag } from '@/entities/tag';
import { BlogProvider } from '@/framework/local';
import styles from './style.module.scss';

const DynamicBackTop = dynamic(() => import('@/components/ui/BackTop'));

interface Props {
  pageProps: {
    pages?: any[];
    categories: Category[];
    tags: Tag[];
  };
}

const DynamicAffix = dynamic(() => import('@/components/ui/Affix'), { ssr: false });

const Main: FC = ({ children }) => (
  <main className={styles.main}>
    <div className={styles.mainContent}>{children}</div>
    <DynamicAffix top={88}>
      <Sidebar />
    </DynamicAffix>
  </main>
);

const Layout: FC<Props> = ({ children, pageProps = { categories: [], tags: [] } }) => {
  const { locale = 'zh-cn' } = useRouter();

  return (
    <BlogProvider locale={locale}>
      <Header links={pageProps.categories} />
      <Main>{children}</Main>
      <Footer />

      <DynamicBackTop />
    </BlogProvider>
  );
};

export default Layout;
