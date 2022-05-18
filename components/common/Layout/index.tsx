import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';
import { Footer, HomeSlider, Navbar, Sidebar } from '@/components/common';
import { BackTop, Container } from '@/components/ui';
import { useGlobalData } from '@/hooks/globalData';
import { useTheme } from '@/hooks';

export interface PageProps {
  showFooter?: boolean;
  showNavbar?: boolean;
  showSidebar?: boolean;
  showSlider?: boolean;
}

const Layout = ({
  children,
  showFooter = true,
  showNavbar = true,
  showSidebar = true,
  showSlider = false,
}: PropsWithChildren<PageProps>) => {
  const { data } = useGlobalData();
  const [theme, setTheme] = useTheme();

  return (
    <div className='app'>
      {showNavbar && (
        <Navbar theme={theme} onThemeChange={setTheme} links={data?.categories || []} />
      )}

      <main
        className={classNames('container mx-auto mb-6 min-h-screen flex-grow space-y-6', {
          'pt-[104px]': showNavbar,
        })}
      >
        {showSlider && (
          <Container>
            <HomeSlider articles={data?.bannerArticles ?? []} />
          </Container>
        )}

        <div className='flex space-x-6'>
          <section
            className={classNames('flex-grow', {
              'max-w-[693px]': showSidebar,
            })}
          >
            {children}
          </section>
          {showSidebar && (
            <Sidebar
              className='max-w-[333px] space-y-6'
              tags={data?.tags || []}
              hotArticles={data?.hotArticles || []}
            />
          )}
        </div>
      </main>
      {showFooter && <Footer />}

      <BackTop />
    </div>
  );
};

export default Layout;
