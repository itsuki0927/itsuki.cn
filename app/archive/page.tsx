import { getArchives } from '@/api/blog';
import { ArchiveView, Statistics } from '@/components/archive';
import Layout from '@/components/common/Layout';
import Hero from '@/components/ui/Hero';
import { getSiteSummary } from '@/api/summary';
import ArchiveClient from '@/components/archive/ArchiveClient';

export const revalidate = 3600;

const fetchData = async () => {
  const archives = await getArchives();
  const siteSummary = await getSiteSummary();

  return { archives, siteSummary };
};

const ArchivePage = async () => {
  const { archives, siteSummary } = await fetchData();

  return (
    <Layout className='bg-gray-50'>
      <ArchiveClient />

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

      <Statistics summary={siteSummary} />

      <ArchiveView archives={archives} />

      {/* <FooterBanner theme='reverse' /> */}
    </Layout>
  );
};

export default ArchivePage;
