import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import { ArticleView } from '@/components/article';
import { Layout } from '@/components/common';
import { getAllArticlePaths, getArticle } from '@/api/article';
import { useArticle } from '@/hooks/article';

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
  await queryClient.prefetchQuery(['article', articleId], () => getArticle(articleId));

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

  if (isFetching || isLoading) return <h1>Loading...</h1>;
  return <ArticleView article={article!} />;
};

ArticlePage.Layout = Layout;

export default ArticlePage;
