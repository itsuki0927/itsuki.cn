import type { AppProps } from 'next/app';
import {
  BlankLayout,
  GA,
  Head,
  LayoutTransition,
  QueryClientContainer,
} from '@/components/common';
import { PageLoadingProgress } from '@/components/ui';
import { useMount } from '@/hooks';
import '@/styles/globals.scss';
import '@/styles/markdown.scss';
import '@/styles/reset.scss';
import enableCopyright from '@/utils/copyright';

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || BlankLayout;

  useMount(() => {
    enableCopyright();
  });

  return (
    <>
      <Head />
      <GA />
      <PageLoadingProgress />

      <QueryClientContainer pageProps={pageProps}>
        <LayoutTransition>
          <Layout pageProps={pageProps}>
            <Component {...pageProps} />
          </Layout>
        </LayoutTransition>
      </QueryClientContainer>
    </>
  );
}

export default MyApp;
