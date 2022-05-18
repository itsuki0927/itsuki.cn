import type { AppProps } from 'next/app';
import { ReactNode } from 'react';
/* eslint-disable import/extensions */
import { GA, Head, LayoutTransition, QueryClientContainer } from '@/components/common';
import { PageLoadingProgress } from '@/components/ui';
import { useMount } from '@/hooks';
import '@/styles/global.css';
import '@/styles/markdown.scss';
import '@/styles/reset.css';
import enableCopyright from '@/utils/copyright';
import { ManagedUIContext } from '@/components/ui/context';

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

      <ManagedUIContext>
        <QueryClientContainer pageProps={pageProps}>
          <LayoutTransition>{getLayout(<Component {...pageProps} />)}</LayoutTransition>
        </QueryClientContainer>
      </ManagedUIContext>
    </>
  );
}

export default MyApp;
