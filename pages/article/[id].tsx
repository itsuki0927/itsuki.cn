import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import { ArticleView } from '@/components/article';
import { Layout } from '@/components/common';
import { ValidationError } from '@/framework/blog/utils/errors';
import blog from '@/lib/api/blog';
import { getArticle } from '@/api/article';
import { useArticle } from '@/hooks/article';

export const getStaticPaths = async () => {
  const { articles } = await blog.getAllArticlePaths();

  const paths = articles.map(article => `/article/${article.id}`);

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const articleId = Number(params?.id);

  if (Number.isNaN(articleId)) {
    throw new ValidationError({ message: '文章ID参数错误' });
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['article', articleId], () => getArticle(articleId));

  blog.addArticleRead({
    variables: { articleId },
  });

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
