import type { AppProps } from 'next/app';
import { useState } from 'react';
import { QueryClientProvider, QueryClient, Hydrate } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BlankLayout, GA, Head, Iconfont } from '@/components/common';
import { PageLoadingProgress } from '@/components/ui';
import { useMount } from '@/hooks';
import '@/styles/globals.scss';
import '@/styles/markdown.scss';
import '@/styles/reset.scss';
import enableCopyright from '@/utils/copyright';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );
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
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Layout pageProps={pageProps}>
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
