import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { ArticleView } from '@/components/article';
import { Layout } from '@/components/common';
import blog from '@/lib/api/blog';
import marked from '@/utils/marked';

export const getStaticPaths = async () => {
  const { articles } = await blog.getAllArticlePaths();

  const paths = articles.map(article => `/article/${article.id}`);

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const id = Number(params?.id);
  const { article } = await blog.getArticle({ variables: { id } });
  const siteInfo = await blog.getSiteInfo();

  blog.patchArticleMeta({
    variables: { id, meta: 'reading' },
  });

  return {
    props: {
      ...siteInfo,
      article: { ...article, content: marked(article.content) },
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
