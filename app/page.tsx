import { Suspense } from 'react';
/* import { NextSeo } from 'next-seo'; */
import { getHotBlogs } from '@/api/blog';
import Layout from '@/components/common/Layout';
import AboutCard from '@/components/home/AboutCard';
import HomeSlider from '@/components/home/HomeSlider';
import HotBlogs from '@/components/home/HotBlogs';
import RecentBlogs from '@/components/home/RecentBlogs';
import RecentComments from '@/components/home/RecentComments';
import SiteSummary from '@/components/home/SiteSummary';
import TimeProgress from '@/components/home/TimeProgress';
import TodoList from '@/components/home/TodoList';
import { LoadingDots } from '@/components/ui';
import Container from '@/components/ui/Container';
import TagList from '../components/home/TagList';

export const revalidate = 3600;

const fetchData = async () => {
  const promise = await getHotBlogs();

  return { promise };
};

const Page = async () => {
  const { promise } = await fetchData();
  return (
    <Layout className='mb-12 space-y-8' footerTheme='reverse'>
      {/* <NextSeo defaultTitle='五块木头' /> */}

      <Container className='flex flex-col space-y-8 pt-8 sm:flex-row sm:space-y-0 sm:space-x-8'>
        <HomeSlider blogs={promise.data} />

        <div className='flex flex-col justify-between sm:mt-0 sm:w-1/3'>
          <AboutCard />
          <Suspense fallback={<LoadingDots />}>
            {/* @ts-expect-error Async Server Component */}
            <SiteSummary />
          </Suspense>
        </div>
      </Container>

      <Container className='flex flex-col sm:flex-row'>
        <div className='space-y-8 sm:max-w-[800px]'>
          <Suspense fallback={<LoadingDots />}>
            {/* @ts-expect-error Async Server Component */}
            <RecentBlogs />
          </Suspense>
          <Suspense fallback={<LoadingDots />}>
            {/* @ts-expect-error Async Server Component */}
            <RecentComments />
          </Suspense>
        </div>

        <div className='mt-8 flex-grow space-y-6 border-t border-dashed border-t-gray-200 pt-8 sm:mt-0 sm:ml-8 sm:max-w-sm sm:space-y-8 sm:border-none sm:pt-0'>
          <div className='flex h-20 items-center justify-between bg-gray-50 p-6'>
            <span>纵有疾风起, 人生不言弃</span>
            <span className='text-sm text-gray-400'>已跑步3800公里</span>
          </div>

          <TimeProgress />
          <Suspense fallback={<LoadingDots />}>
            {/* @ts-expect-error Async Server Component */}
            <HotBlogs />
          </Suspense>

          <TodoList />

          <Suspense fallback={<LoadingDots />}>
            {/* @ts-expect-error Async Server Component */}
            <TagList />
          </Suspense>
        </div>
      </Container>
    </Layout>
  );
};

export default Page;
