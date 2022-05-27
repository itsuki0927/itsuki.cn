import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
/* eslint-disable import/extensions */
import { GA, Head, LayoutTransition, QueryClientContainer } from '@/components/common';
import { PageLoadingProgress } from '@/components/ui';
import { useMount, useUnMount, useCopyright } from '@/hooks';
import '@/styles/global.css';
import { ManagedUIContext } from '@/components/ui/context';

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = (Component as any).getLayout || ((page: ReactNode) => page);
  const { enableCopyright, disableCopyright } = useCopyright();

  useMount(enableCopyright);
  useUnMount(disableCopyright);

  return (
    <>
      <Head />
      <GA />
      <PageLoadingProgress />
      <Toaster
        toastOptions={{
          duration: 2000,
          error: {
            duration: 2500,
          },
        }}
      />

      <SessionProvider session={pageProps.session}>
        <ManagedUIContext>
          <QueryClientContainer pageProps={pageProps}>
            <LayoutTransition>{getLayout(<Component {...pageProps} />)}</LayoutTransition>
          </QueryClientContainer>
        </ManagedUIContext>
      </SessionProvider>
    </>
  );
}

export default MyApp;
