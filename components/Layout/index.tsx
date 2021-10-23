import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { Category } from '@/entities/category';
import { Tag } from '@/entities/tag';
import { BlogProvider } from '@/helpers/index';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';

const DynamicBackTop = dynamic(() => import('@/components/BackTop'));

interface Props {
  pageProps: {
    pages?: any[];
    categories: Category[];
    tags: Tag[];
  };
}

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
