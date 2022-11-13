import { NextSeo } from 'next-seo';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { getArchives } from '@/api/blog';
import { ArchiveView, Statistics } from '@/components/archive';
import { Layout } from '@/components/common';
import { Hero } from '@/components/ui';
import { GAEventCategories } from '@/constants/gtag';
import { blogKeys } from '@/constants/queryKeys';
import { TIMESTAMP } from '@/constants/value';
import { useMount } from '@/hooks';
import { useArchives } from '@/hooks/blog';
import { useSiteSummary } from '@/hooks/summary';
import { gtag } from '@/utils/gtag';

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(blogKeys.archive(), () => getArchives());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: TIMESTAMP.MINIUTE / 1000,
  };
};

const ArchivePage = () => {
  const archives = useArchives();
  const { data: summary } = useSiteSummary();

  useMount(() => {
    gtag.event('archive', {
      category: GAEventCategories.Archive,
    });
  });

  return (
    <Layout className='bg-gray-50'>
      <NextSeo title='归档' />

      <Hero>
        <Hero.BackgroundImage url='/archive-banner.jpeg' />
        <Hero.Container>
          <Hero.Title>归档</Hero.Title>
          <Hero.Description>
            有时候幸福需要等一等
            <span className='mx-1'> - </span>
            <span className='text-lg text-gray-300'> 《幸福终点站》</span>
          </Hero.Description>
        </Hero.Container>
      </Hero>

      <Statistics summary={summary} />

      <ArchiveView archives={archives.data} />

      {/* <FooterBanner theme='reverse' /> */}
    </Layout>
  );
};

export default ArchivePage;
