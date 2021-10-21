import '@/components/Button/style.scss';
import '@/components/Card/style.scss';
import { fetchGlobalData } from 'api/global';
import type { AppProps } from 'next/app';
import React from 'react';
import GA from '@/components/GA';
import Layout from '@/components/Layout';
import PageLoadingProgress from '@/components/PageLoadingProgress';
import '@/styles/globals.scss';
import '@/styles/markdown.scss';
import '@/styles/reset.scss';
import AppContext, { AppContextType } from '@/utils/context';

function MyApp({ Component, pageProps, data }: AppProps & { data: AppContextType }) {
  return (
    <AppContext.Provider value={data}>
      <GA />
      <PageLoadingProgress />
      <Layout>
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
