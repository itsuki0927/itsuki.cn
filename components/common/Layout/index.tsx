import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';
import { Footer, Navbar, Sidebar } from '@/components/common';
import { BackTop } from '@/components/ui';
import { useGlobalData } from '@/hooks/globalData';
import { useTheme } from '@/hooks';

export interface PageProps {
  showFooter?: boolean;
  showNavbar?: boolean;
  showSidebar?: boolean;
}

const Layout = ({
  children,
  showFooter = true,
  showNavbar = true,
  showSidebar = true,
}: PropsWithChildren<PageProps>) => {
  const { data } = useGlobalData();
  const [theme, setTheme] = useTheme();

  return (
    <div className='flex min-h-screen flex-col'>
      {showNavbar && (
        <Navbar theme={theme} onThemeChange={setTheme} links={data?.categories || []} />
      )}

      <main className='container mx-auto mb-6 flex flex-grow space-x-5'>
        <section
          className={classNames('flex-grow', {
            'w-[695px]': showSidebar,
          })}
        >
          {children}
        </section>
        {showSidebar && (
          <Sidebar
            className='w-[335px] space-y-5'
            tags={data?.tags || []}
            hotArticles={data?.hotArticles || []}
          />
        )}
      </main>

      {showFooter && <Footer />}
      <BackTop />
    </div>
  );
};

export default Layout;
