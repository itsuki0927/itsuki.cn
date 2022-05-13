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
    <>
      {showNavbar && (
        <Navbar theme={theme} onThemeChange={setTheme} links={data?.categories || []} />
      )}

      <div
        className={classNames('flex min-h-screen flex-col space-y-6', {
          'pt-[104px]': showNavbar,
        })}
      >
        <main
          className={classNames('container mx-auto mb-6 flex flex-grow space-x-6', {})}
        >
          <section
            className={classNames('flex-grow', {
              'w-[693px]': showSidebar,
            })}
          >
            {children}
          </section>
          {showSidebar && (
            <Sidebar
              className='w-[333px] space-y-6'
              tags={data?.tags || []}
              hotArticles={data?.hotArticles || []}
            />
          )}
        </main>

        {showFooter && <Footer />}
        <BackTop />
      </div>
    </>
  );
};

export default Layout;
