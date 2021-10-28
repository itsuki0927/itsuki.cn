import type { AppProps } from 'next/app';
import { FC } from 'react';
import { GA, Iconfont } from '@/components/common';
import { PageLoadingProgress } from '@/components/ui';
import '@/styles/globals.scss';
import '@/styles/markdown.scss';
import '@/styles/reset.scss';

const Noop: FC = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop;

  return (
    <>
      <Iconfont />
      <GA />
      <PageLoadingProgress />
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
