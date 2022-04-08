import { useState } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { getArticles, getBannerArticles } from '@/api/article';
import { getGlobalData } from '@/api/global';
import { ArticleList } from '@/components/article';
import { DashboardLayout } from '@/components/common';
import { Button, Loading } from '@/components/ui';
import { DEFAULT_CURRENT, DEFAULT_PAGE_SIZE } from '@/constants/pagination';
import { articleKeys, globalDataKeys } from '@/constants/queryKeys';
import { useArticles } from '@/hooks/article';
import { LeftOutlined, RightOutlined } from '@/components/icons';
import scrollTo from '@/utils/scrollTo';

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(articleKeys.banner(), () => getBannerArticles());
  await queryClient.prefetchQuery(articleKeys.pagination(1), () =>
    getArticles({ current: DEFAULT_CURRENT, pageSize: DEFAULT_PAGE_SIZE })
  );
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

  if (articles.isLoading || articles.isFetching) {
    return <Loading />;
  }

  if (articles.isError) {
    return <div>出错了</div>;
  }

  return (
    <div className='home space-y-6' id='dashboard'>
      <ArticleList {...articles} />

      <div className='flex justify-between'>
        <Button
          disabled={!articles.data?.hasPrev}
          onClick={() => {
            setCurrent(c => Math.max(1, c - 1));
            scrollTo('#dashboard', 300);
          }}
          className='flex items-center px-4 py-[10px] text-xxs font-light tracking-widest text-gray-3 dark:text-gray-3--dark'
        >
          <LeftOutlined className='mr-1 text-xxs' />
          NEW POSTS
        </Button>
        <Button
          disabled={!articles.data?.hasNext}
          onClick={() => {
            setCurrent(c => c + 1);
            scrollTo('#dashboard', 300);
          }}
          className='flex items-center px-4 py-[10px] text-xxs font-light tracking-widest text-gray-3 dark:text-gray-3--dark'
        >
          OLD POSTS
          <RightOutlined className='ml-1 text-xxs' />
        </Button>
      </div>
    </div>
  );
};

HomePage.Layout = DashboardLayout;

export default HomePage;
