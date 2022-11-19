'use client';

/* eslint-disable import/extensions */
import { DefaultSeo } from 'next-seo';
import { Toaster } from 'react-hot-toast';
import { ManagedUIContext } from '@/components/ui/context';
import { META } from '@/configs/app';
import config from '@/configs/seo';
import { useCopyright, useMount, useUnMount } from '@/hooks';
import '@/styles/global.css';
import { AuthProvider } from '@/libs/auth';
import GA from '@/components/common/GA';
import { QueryClientContainer } from '@/components/common';

function AppLayout({ children }: any) {
  const { enableCopyright, disableCopyright } = useCopyright();

  useMount(enableCopyright);
  useUnMount(disableCopyright);

  return (
    <>
      <GA />
      <DefaultSeo
        {...config}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: META.keywords,
          },
        ]}
      />
      <Toaster
        toastOptions={{
          duration: 2000,
          error: {
            duration: 2500,
          },
        }}
      />

      <AuthProvider>
        <ManagedUIContext>
          <QueryClientContainer>{children}</QueryClientContainer>
        </ManagedUIContext>
      </AuthProvider>
    </>
  );
}

export default AppLayout;
