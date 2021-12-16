import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { ArticleView } from '@/components/article';
import { Layout } from '@/components/common';
import { ValidationError } from '@/framework/blog/utils/errors';
import blog from '@/lib/api/blog';
import { markedToHtml } from '@/utils';

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

  const { article } = await blog.getArticle({ variables: { articleId } });
  const siteInfo = await blog.getSiteInfo();

  blog.addArticleRead({
    variables: { articleId },
  });

  return {
    props: {
      ...siteInfo,
      article: { ...article, content: markedToHtml(article.content) },
    },
    revalidate: 10,
  };
};

const ArticlePage = ({ article }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  if (router.isFallback) return <h1>Loading...</h1>;
  return <ArticleView article={article} />;
};

ArticlePage.Layout = Layout;

export default ArticlePage;
