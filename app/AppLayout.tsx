'use client';

/* eslint-disable import/extensions */
import { DefaultSeo } from 'next-seo';
import { Toaster } from 'react-hot-toast';
import { GA, QueryClientContainer } from '@/components/common';
import { ManagedUIContext } from '@/components/ui/context';
import { META } from '@/configs/app';
import config from '@/configs/seo';
import { useCopyright, useMount, useUnMount } from '@/hooks';
import '@/styles/global.css';
import { AuthProvider } from '@/libs/auth';

function AppLayout({ children, ...rest }: any) {
  const { enableCopyright, disableCopyright } = useCopyright();

  useMount(enableCopyright);
  useUnMount(disableCopyright);

  console.log('children:', children);
  console.log('rest:', rest);

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
