import type { AppProps } from 'next/app';
import { BlankLayout, GA, Iconfont, Head } from '@/components/common';
import { PageLoadingProgress } from '@/components/ui';
import useMount from '@/hooks/useMount';
import '@/styles/globals.scss';
import '@/styles/markdown.scss';
import '@/styles/reset.scss';
import { enableCopyright } from '@/utils';

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || BlankLayout;

  useMount(() => {
    enableCopyright();
  });

  return (
    <>
      <Head />
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
