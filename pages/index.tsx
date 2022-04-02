import { useState } from 'react';
import dynamic from 'next/dynamic';
import { QueryClient, dehydrate } from 'react-query';
import { Layout } from '@/components/common';
import { SoundOutlined } from '@/components/icons';
import { getArticles, getBannerArticles } from '@/api/article';
import { getGlobalData } from '@/api/global';
import { useArticles, useBannerArticles } from '@/hooks/article';
import { Button } from '@/components/ui';
import { ArticleList } from '@/components/article';
import { globalDataKeys } from '@/constants/queryKeys';

const Alert = ({ message }: { message: string }) => (
  <div className='border-l-4 border-l-blue-500 bg-blue-50 p-4'>
    <SoundOutlined className='mr-4 text-blue-400' />
    <span className='text-blue-500'>{message}</span>
  </div>
);

const HomeSlider = dynamic(() => import('@/components/common/HomeSlider'));

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('bannerArticles', () => getBannerArticles());
  await queryClient.prefetchQuery('article', () => getArticles());
  await queryClient.prefetchQuery(globalDataKeys.globalData, () => getGlobalData());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10,
  };
};

const HomePage = () => {
  const [current, setCurrent] = useState(1);
  const articles = useArticles(current);
  const { data: bannerArticles } = useBannerArticles();

  return (
    <div className='home space-y-6'>
      <HomeSlider articles={bannerArticles} />

      <Alert message='思考比写代码来的更加珍贵' />

      <ArticleList {...articles} />

      <div className='flex justify-end space-x-4'>
        <Button
          disabled={!articles.data?.hasPrev}
          onClick={() => {
            if (articles.data?.hasPrev) {
              setCurrent(c => Math.max(1, c - 1));
            }
          }}
        >
          上一页
        </Button>
        <Button
          disabled={!articles.data?.hasNext}
          onClick={() => {
            if (articles.data?.hasNext) {
              setCurrent(c => c + 1);
            }
          }}
        >
          下一页
        </Button>
      </div>
    </div>
  );
};

HomePage.Layout = Layout;

export default HomePage;
