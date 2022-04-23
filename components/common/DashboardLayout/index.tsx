import React, { PropsWithChildren } from 'react';
import { Footer, HomeSlider, Navbar, Sidebar } from '@/components/common';
import { BackTop, Container } from '@/components/ui';
import { useGlobalData } from '@/hooks/globalData';
import { useBannerArticles } from '@/hooks/article';

const DashboardLayout = ({ children }: PropsWithChildren<void>) => {
  const { data } = useGlobalData();
  const articles = useBannerArticles();

  return (
    <>
      <div className='flex min-h-screen flex-col'>
        <Navbar links={data?.categories} />

        <Container className='container mb-10'>
          <HomeSlider articles={articles} />
        </Container>

        <main className='mx-auto mb-6 flex flex-grow space-x-6'>
          <section className='w-[693px] flex-grow'>{children}</section>
          <Sidebar
            className='w-[333px] space-y-6'
            tags={data?.tags ?? []}
            hotArticles={data?.hotArticles ?? []}
          />
        </main>

        <Footer />
      </div>
      <BackTop />
    </>
  );
};

export default DashboardLayout;
