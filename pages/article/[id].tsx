import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from 'react-query';
import { getAllArticlePaths, getArticle, readArticle } from '@/api/article';
import { getBlackList } from '@/api/blacklist';
import { getComments } from '@/api/comment';
import { getAllTags } from '@/api/tag';
import { ArticlePagination, ArticleSkeleton } from '@/components/article';
import ArticleAside from '@/components/article/ArticleAside';
import ArticleContent from '@/components/article/ArticleContent';
import ArticleHeader from '@/components/article/ArticleHeader';
import RelateArticles, {
  RelateArticleSkeleton,
} from '@/components/article/RelateArticles';
import {
  CommentFormSkeletion,
  CommentListSkeleton,
  CommentView,
} from '@/components/comment';
import { Layout, Navbar } from '@/components/common';
import { GAEventCategories } from '@/constants/gtag';
import { articleKeys, blacklistKeys, commentKeys, tagKeys } from '@/constants/queryKeys';
import { useMount } from '@/hooks';
import { useArticle, useArticles } from '@/hooks/article';
import { gtag } from '@/utils/gtag';
import { getArticleDetailFullUrl } from '@/utils/url';

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

  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery(articleKeys.detail(articleId), () => getArticle(articleId)),
    queryClient.prefetchQuery(commentKeys.lists(articleId), () => getComments(articleId)),
    queryClient.prefetchQuery(tagKeys.lists(), () => getAllTags()),
    queryClient.prefetchQuery(blacklistKeys.list, () => getBlackList()),
  ]);

  return {
    props: {
      articleId,
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 60 * 24, // 一个小时
  };
};

const ArticlePage = ({ articleId }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: article, isLoading } = useArticle(articleId);
  const { isFallback } = useRouter();
  const { data } = useArticles();
  const relateArticles = data?.data.slice(0, 3) ?? [];

  useMount(() => {
    readArticle(articleId);
    gtag.event('article_view', {
      category: GAEventCategories.Article,
      label: article?.title,
    });
  });

  if (isFallback || isLoading || !article)
    return (
      <Layout>
        <div className='container space-y-6'>
          <ArticleSkeleton />
          <RelateArticleSkeleton />
          <CommentFormSkeletion />
          <CommentListSkeleton />
        </div>
      </Layout>
    );

  return (
    <Layout
      hero={
        <div className='space-y-10 bg-white py-10'>
          <Navbar />

          <ArticleHeader article={article} />
        </div>
      }
    >
      <div className='flex w-full'>
        <div className='max-w-full sm:max-w-3xl'>
          <NextSeo
            title={article.title}
            description={article.description}
            additionalMetaTags={[
              { name: 'keywords', content: article.keywords },
              {
                name: 'cover',
                content: article.cover,
              },
            ]}
          />
          <ArticleJsonLd
            url={getArticleDetailFullUrl(article.id)}
            title={article.title}
            images={[article.cover]}
            datePublished={article.createAt.toString()}
            dateModified={article.updateAt.toString()}
            authorName={article.author}
            description={article.description}
          />

          <ArticleContent article={article} />
        </div>

        <div className='hidden flex-grow sm:block'>
          <ArticleAside article={article} />
        </div>
      </div>

      <div className='bg-white sm:max-w-3xl'>
        <ArticlePagination
          prevArticle={article.prevArticle}
          nextArticle={article.nextArticle}
        />

        <RelateArticles relateArticles={relateArticles} />

        <CommentView articleId={article.id} />
      </div>
    </Layout>
  );
};

export default ArticlePage;
