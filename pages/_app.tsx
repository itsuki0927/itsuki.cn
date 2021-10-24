import type { AppProps } from 'next/app';
import React, { FC } from 'react';
import { fetchGlobalData } from '@/api/global';
import { GA } from '@/components/common';
import { PageLoadingProgress } from '@/components/ui';
import '@/styles/globals.scss';
import '@/styles/markdown.scss';
import '@/styles/reset.scss';
import AppContext, { AppContextType } from '@/utils/context';

const Noop: FC = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps, data }: AppProps & { data: AppContextType }) {
  const Layout = (Component as any).Layout || Noop;

  return (
    <AppContext.Provider value={data}>
      <GA />
      <PageLoadingProgress />
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  );
}

MyApp.getInitialProps = async () => {
  const res = await fetchGlobalData();
  return { data: res };
};
export default MyApp;
