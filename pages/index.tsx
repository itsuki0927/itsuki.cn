import dynamic from 'next/dynamic';
import { QueryClient, dehydrate } from 'react-query';
import { Layout } from '@/components/common';
import { SoundOutlined } from '@/components/icons';
import { getArticles, getBannerArticles } from '@/api/article';
import { getGlobalData } from '@/api/global';
import { useArticles, useBannerArticles } from '@/hooks/article';

const Alert = ({ message }: { message: string }) => (
  <div className='border-l-4 border-l-blue-500 bg-blue-50 p-4'>
    <SoundOutlined className='mr-4 text-blue-400' />
    <span className='text-blue-500'>{message}</span>
  </div>
);

const ArticleList = dynamic(() => import('@/components/article/ArticleList'));
const HomeSlider = dynamic(() => import('@/components/common/HomeSlider'));

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('bannerArticles', () => getBannerArticles());
  await queryClient.prefetchQuery('article', () => getArticles());
  await queryClient.prefetchQuery('globalData', () => getGlobalData());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10,
  };
};

const HomePage = () => {
  const { data: articles } = useArticles();
  const { data: bannerArticles } = useBannerArticles();

  return (
    <div className='home space-y-6'>
      <HomeSlider articles={bannerArticles} />

      <Alert message='思考比写代码来的更加珍贵' />

      <ArticleList articles={articles} />
    </div>
  );
};

HomePage.Layout = Layout;

export default HomePage;
