import type { AppProps } from 'next/app';
import Head from 'next/head';
import { FC } from 'react';
import { GA } from '@/components/common';
import { PageLoadingProgress } from '@/components/ui';
import { ICONFONT_URL } from '@/configs/app';
import '@/styles/globals.scss';
import '@/styles/markdown.scss';
import '@/styles/reset.scss';

const Noop: FC = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop;

  return (
    <>
      <Head>
        <link rel='stylesheet' href={ICONFONT_URL} />
      </Head>
      <GA />
      <PageLoadingProgress />
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
