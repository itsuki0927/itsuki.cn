import type { AppProps } from 'next/app';
import { GA, Iconfont, BlankLayout } from '@/components/common';
import { PageLoadingProgress } from '@/components/ui';
import '@/styles/globals.scss';
import '@/styles/markdown.scss';
import '@/styles/reset.scss';

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || BlankLayout;

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
