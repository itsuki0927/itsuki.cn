import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { ReactNode } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { getGlobalData } from '@/api/global';
import { readArticle, getAllArticlePaths, getArticle } from '@/api/article';
import { ArticleView } from '@/components/article';
import { ErrorHandler, Layout } from '@/components/common';
import { Loading } from '@/components/ui';
import { useArticle } from '@/hooks/article';
import { articleKeys, globalDataKeys } from '@/constants/queryKeys';

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
    return {
      notFound: true,
    };
  }

  readArticle(articleId);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(articleKeys.detail(articleId), () =>
    getArticle(articleId)
  );
  await queryClient.prefetchQuery(globalDataKeys.globalData, () => getGlobalData());

  return {
    props: {
      articleId,
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10,
  };
};

const ArticlePage = ({ articleId }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: article, isFetching, isLoading, isError } = useArticle(articleId);

  if (isFetching || isLoading) return <Loading />;
  if (isError) return <ErrorHandler title='' message='' img='/404.jpg' />;
  return <ArticleView article={article!} />;
};

ArticlePage.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

export default ArticlePage;
