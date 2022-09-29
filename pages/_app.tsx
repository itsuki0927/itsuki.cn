/* eslint-disable import/extensions */
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import { GA, LayoutTransition, MyHead, QueryClientContainer } from '@/components/common';
import { PageLoadingProgress } from '@/components/ui';
import { ManagedUIContext } from '@/components/ui/context';
import { META } from '@/configs/app';
import config from '@/configs/seo';
import { useCopyright, useMount, useUnMount } from '@/hooks';
import '@/styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  const { enableCopyright, disableCopyright } = useCopyright();
  const { route } = useRouter();

  useMount(enableCopyright);
  useUnMount(disableCopyright);

  const items = {
    pageProps,
    id: route,
    Component,
  };

  return (
    <>
      <DefaultSeo
        {...config}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: META.keywords,
          },
        ]}
      />
      <GA />
      <MyHead />
      <PageLoadingProgress />
      <Toaster
        toastOptions={{
          duration: 2000,
          error: {
            duration: 2500,
          },
        }}
      />

      <SessionProvider session={(pageProps as any).session}>
        <ManagedUIContext>
          <QueryClientContainer pageProps={pageProps}>
            <LayoutTransition items={items} />
          </QueryClientContainer>
        </ManagedUIContext>
      </SessionProvider>
    </>
  );
}

export default MyApp;
