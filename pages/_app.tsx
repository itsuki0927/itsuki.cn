/* eslint-disable import/extensions */
import type { AppProps } from 'next/app';
import { ReactNode } from 'react';
import { GA, Head, LayoutTransition, QueryClientContainer } from '@/components/common';
import { PageLoadingProgress } from '@/components/ui';
import { useMount } from '@/hooks';
import '@/styles/global.css';
import '@/styles/reset.css';
import '@/styles/markdown.scss';
import enableCopyright from '@/utils/copyright';

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = (Component as any).getLayout || ((page: ReactNode) => page);

  useMount(() => {
    enableCopyright();
  });

  return (
    <>
      <Head />
      <GA />
      <PageLoadingProgress />

      <QueryClientContainer pageProps={pageProps}>
        <LayoutTransition>{getLayout(<Component {...pageProps} />)}</LayoutTransition>
      </QueryClientContainer>
    </>
  );
}

export default MyApp;
