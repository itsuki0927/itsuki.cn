import { ReactNode, useState } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import classNames from 'classnames';
import { getArticles } from '@/api/article';
import { getGlobalData } from '@/api/global';
import { ArticleList } from '@/components/article';
import { DashboardLayout } from '@/components/common';
import { Loading } from '@/components/ui';
import { DEFAULT_CURRENT, DEFAULT_PAGE_SIZE } from '@/constants/pagination';
import { articleKeys, globalDataKeys } from '@/constants/queryKeys';
import { useArticles } from '@/hooks/article';
import { LeftOutlined, RightOutlined } from '@/components/icons';
import scrollTo from '@/utils/scrollTo';

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

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

  return (
    <div className='home space-y-6' id='dashboard'>
      <ArticleList {...articles} />

      <div className='flex justify-between'>
        <button
          type='button'
          disabled={!articles.data?.hasPrev}
          onClick={() => {
            setCurrent(c => Math.max(1, c - 1));
            scrollTo('#dashboard', 300, {
              offset: -80,
            });
          }}
          className={classNames(
            'flex items-center rounded-sm px-4 py-2 text-xs font-light tracking-widest transition-colors duration-300 ',
            !articles.data?.hasPrev
              ? 'cursor-not-allowed text-gray-1'
              : 'bg-white text-primary hover:bg-primary hover:text-white  '
          )}
        >
          <LeftOutlined className='mr-1 text-xxs' />
          NEW POSTS
        </button>
        <button
          type='button'
          disabled={!articles.data?.hasNext}
          onClick={() => {
            setCurrent(c => c + 1);
            scrollTo('#dashboard', 300, {
              offset: -80,
            });
          }}
          className={classNames(
            'flex items-center rounded-sm px-4 py-2 text-xs font-light tracking-widest transition-colors duration-300',
            !articles.data?.hasNext
              ? 'cursor-not-allowed text-gray-1'
              : 'bg-white text-primary hover:bg-primary hover:text-white  '
          )}
        >
          OLD POSTS
          <RightOutlined className='ml-1 text-xxs' />
        </button>
      </div>
    </div>
  );
};

HomePage.getLayout = (page: ReactNode) => <DashboardLayout>{page}</DashboardLayout>;

export default HomePage;
