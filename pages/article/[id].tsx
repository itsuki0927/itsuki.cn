import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import { ArticleView } from '@/components/article';
import { Layout } from '@/components/common';
import { Loading } from '@/components/ui';
import { getAllArticlePaths, getArticle } from '@/api/article';
import { useArticle } from '@/hooks/article';
import { articleKeys, globalDataKeys } from '@/constants/queryKeys';
import { getGlobalData } from '@/api/global';

export const getStaticPaths = async () => {
  const paths = await getAllArticlePaths();

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const articleId = Number(params?.id);

  if (Number.isNaN(articleId)) {
    throw new Error('文章ID参数错误');
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(articleKeys.detail(articleId), () =>
    getArticle(articleId)
  );
  await queryClient.prefetchQuery(globalDataKeys.globalData, () => getGlobalData());

  // TODO: 添加阅读数

  return {
    props: {
      articleId,
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10,
  };
};

const ArticlePage = ({ articleId }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: article, isFetching, isLoading } = useArticle(articleId);

  if (isFetching || isLoading) return <Loading />;
  return <ArticleView article={article!} />;
};

ArticlePage.Layout = Layout;

export default ArticlePage;
