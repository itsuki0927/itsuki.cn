import { NextSeo } from 'next-seo';
import { Coffee, Edit2, Eye, MessageCircle, MessageSquare, Tag } from 'react-feather';
import { dehydrate, QueryClient } from 'react-query';
import { getArchives } from '@/api/article';
import ArchiveView from '@/components/archive';
import { Layout } from '@/components/common';
import { Container } from '@/components/ui';
import FooterBanner from '@/components/ui/FooterBanner';
import { GAEventCategories } from '@/constants/gtag';
import { articleKeys } from '@/constants/queryKeys';
import { TIMESTAMP } from '@/constants/value';
import { SiteSummary } from '@/entities/summary';
import { useMount } from '@/hooks';
import { useArchives } from '@/hooks/article';
import { useSiteSummary } from '@/hooks/summary';
import { gtag } from '@/utils/gtag';

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(articleKeys.archive(), () => getArchives());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: TIMESTAMP.DAY / 1000,
  };
};

interface BannerProps {
  summary?: SiteSummary;
}
const Banner = ({ summary }: BannerProps) => {
  const list = [
    { title: '建站天数', count: summary?.diffDay, icon: <Coffee size={16} /> },
    { title: '全站文章', count: summary?.article, icon: <Edit2 size={16} /> },
    { title: '全站标签', count: summary?.tag, icon: <Tag size={16} /> },
    { title: '全站阅读', count: summary?.reading, icon: <Eye size={16} /> },
    { title: '全站留言', count: summary?.guestbook, icon: <MessageCircle size={16} /> },
    { title: '全站评论', count: summary?.comment, icon: <MessageSquare size={16} /> },
  ];

  return (
    <div className='bg-white'>
      <Container className='flex flex-row flex-wrap'>
        {list.map(item => (
          <div
            className='w-1/2 py-6 px-7 transition-colors hover:bg-gray-50 md:w-auto md:py-12 md:px-14'
            key={item.title}
          >
            <p className='flex items-center space-x-2 text-sm text-gray-400'>
              <span className='text-gray-500'>{item.title}</span>
              {item.icon}
            </p>
            <div className='mt-2 text-3xl font-medium text-gray-700'>{item.count}</div>
          </div>
        ))}
      </Container>
    </div>
  );
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
    <Layout className='bg-gray-50' footerTheme='reverse'>
      <NextSeo title='归档' />

      <div className='relative max-h-72 items-center overflow-hidden sm:max-h-[402px]'>
        <img
          src='/archive-banner.jpeg'
          className='max-h-[402px] w-full object-cover'
          alt='archive banner'
        />
        <div className='container absolute top-0 bottom-0  left-0 right-0 flex flex-col justify-center px-4'>
          <h1 className='mb-6 text-3xl font-medium tracking-tight text-gray-100 sm:text-5xl'>
            归档
          </h1>
          <p className='text-xl text-gray-200'>
            有时候幸福需要等一等
            <span className='mx-1'> - </span>
            <span className='text-lg text-gray-300'> 《幸福终点站》</span>
          </p>
        </div>
      </div>

      <Banner summary={summary} />

      <ArchiveView archives={archives.data} />

      <FooterBanner theme='reverse' />
    </Layout>
  );
};

export default ArchivePage;
