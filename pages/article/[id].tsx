import { useRouter } from 'next/router';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { ReactNode } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { getGlobalData } from '@/api/global';
import { readArticle, getAllArticlePaths, getArticle } from '@/api/article';
import { ArticleSkeleton, ArticleView } from '@/components/article';
import { Layout } from '@/components/common';
import { useArticle } from '@/hooks/article';
import { articleKeys, globalDataKeys } from '@/constants/queryKeys';
import { RelateArticleSkeleton } from '@/components/article/RelateArticles';
import { CommentFormSkeletion, CommentListSkeleton } from '@/components/comment';
import { useMount } from '@/hooks';
import { gtag } from '@/utils/gtag';
import { GAEventCategories } from '@/constants/gtag';

export const getStaticPaths = async () => {
  const paths = await getAllArticlePaths();

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const articleId = Number(params?.id);

  if (Number.isNaN(articleId)) {
    return {
      notFound: true,
    };
  }

  await readArticle(articleId);

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
    revalidate: 60 * 60 * 24, // 一个小时
  };
};

const ArticlePage = ({ articleId }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: article, isFetching, isLoading } = useArticle(articleId);
  const { isFallback } = useRouter();

  useMount(() => {
    gtag.event('article_view', {
      category: GAEventCategories.Article,
      label: article?.title,
    });
  });

  if (isFallback || isFetching || isLoading || !article)
    return (
      <div className='space-y-6'>
        <ArticleSkeleton />
        <RelateArticleSkeleton />
        <CommentFormSkeletion />
        <CommentListSkeleton />
      </div>
    );

  return <ArticleView article={article} />;
};

ArticlePage.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

export default ArticlePage;
