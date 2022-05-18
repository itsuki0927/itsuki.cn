import React, { PropsWithChildren } from 'react';
import { Footer, HomeSlider, Navbar, Sidebar } from '@/components/common';
import { BackTop, Container } from '@/components/ui';
import { useGlobalData } from '@/hooks/globalData';
import { useTheme } from '@/hooks';

const DashboardLayout = ({ children }: PropsWithChildren<any>) => {
  const { data } = useGlobalData();
  const [theme, setTheme] = useTheme();

  return (
    <>
      <Navbar theme={theme} onThemeChange={setTheme} links={data?.categories} />
      <div className='flex min-h-screen flex-col space-y-6 pt-24'>
        <main className='container mx-auto flex-grow space-y-6'>
          <Container>
            <HomeSlider articles={data?.bannerArticles ?? []} />
          </Container>

          <div className='flex space-x-6'>
            <section className='w-[693px] flex-grow'>{children}</section>
            <Sidebar
              className='w-[333px] space-y-6'
              tags={data?.tags ?? []}
              hotArticles={data?.hotArticles ?? []}
            />
          </div>
        </main>

        <Footer />
      </div>
      <BackTop />
    </>
  );
};

export default DashboardLayout;
