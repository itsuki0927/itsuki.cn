import type { AppProps } from 'next/app';
import { ReactNode } from 'react';
/* eslint-disable import/extensions */
import { GA, Head, LayoutTransition, QueryClientContainer } from '@/components/common';
import { Popup, PageLoadingProgress } from '@/components/ui';
import { useMount } from '@/hooks';
import '@/styles/global.css';
import '@/styles/markdown.scss';
import '@/styles/reset.css';
import { CustomWindow } from '@/types/window';
import enableCopyright from '@/utils/copyright';

declare let window: CustomWindow;

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
      <Popup
        ref={popup => {
          window.$popup = popup;
        }}
      />

      <QueryClientContainer pageProps={pageProps}>
        <LayoutTransition>{getLayout(<Component {...pageProps} />)}</LayoutTransition>
      </QueryClientContainer>
    </>
  );
}

export default MyApp;
