import type { AppProps } from 'next/app';
import React from 'react';
import { fetchGlobalData } from '@/api/global';
import { GA, Layout } from '@/components/common';
import { PageLoadingProgress } from '@/components/ui';
import '@/styles/globals.scss';
import '@/styles/markdown.scss';
import '@/styles/reset.scss';
import AppContext, { AppContextType } from '@/utils/context';

function MyApp({ Component, pageProps, data }: AppProps & { data: AppContextType }) {
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
