import { ReactNode, useState } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { getArticles } from '@/api/article';
import { getGlobalData } from '@/api/global';
import { ArticleList, ArticleSkeletonList } from '@/components/article';
import ArticleListPagination from '@/components/article/ArticleListPagination';
import { Layout } from '@/components/common';
import { DEFAULT_CURRENT, DEFAULT_PAGE_SIZE } from '@/constants/pagination';
import { articleKeys, globalDataKeys } from '@/constants/queryKeys';
import { useArticles } from '@/hooks/article';

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
    revalidate: 60 * 60 * 24,
  };
};

const HomePage = () => {
  const [current, setCurrent] = useState(1);
  const articles = useArticles(current);

  if (articles.isLoading || articles.isFetching) {
    return <ArticleSkeletonList />;
  }

  return (
    <div className='home space-y-6' id='dashboard'>
      <ArticleList {...articles} />

      <ArticleListPagination
        hasNext={articles.data?.hasNext}
        hasPrev={articles.data?.hasPrev}
        onChange={c => setCurrent(current + c)}
      />
    </div>
  );
};

HomePage.getLayout = (page: ReactNode) => <Layout showSlider>{page}</Layout>;

export default HomePage;
