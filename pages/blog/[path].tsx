import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { getAllArticlePathsWithPath, getArticleByPath, readArticle } from '@/api/article';
import { getBlackList } from '@/api/blacklist';
import { getAllTags } from '@/api/tag';
import { ArticlePagination, ArticleSkeleton } from '@/components/article';
import ArticleAside from '@/components/article/ArticleAside';
import ArticleHeader from '@/components/article/ArticleHeader';
import ArticleMeta from '@/components/article/ArticleMeta';
import FavoriteButton from '@/components/article/FavoriteButton';
import RelateArticles, {
  RelateArticleSkeleton,
} from '@/components/article/RelateArticles';
import {
  CommentFormSkeletion,
  CommentListSkeleton,
  CommentView,
} from '@/components/comment';
import { Layout, Navbar, Share } from '@/components/common';
import { Container, MarkdownBlock } from '@/components/ui';
import { META } from '@/configs/app';
import { ARTICLE_ACTIONS_ELEMENT_ID } from '@/constants/anchor';
import { GAEventCategories } from '@/constants/gtag';
import { articleKeys, blacklistKeys, tagKeys } from '@/constants/queryKeys';
import { useArticles, useArticleByPath } from '@/hooks/article';
import { gtag } from '@/utils/gtag';
import { getArticleDetailFullUrl } from '@/utils/url';

export const getStaticPaths = async () => {
  const paths = await getAllArticlePathsWithPath();

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const path = String(params?.path);
  console.log('path', path);

  if (!path) {
    return {
      notFound: true,
    };
  }

  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery(articleKeys.detailByPath(path), () =>
      getArticleByPath(path)
    ),
    queryClient.prefetchQuery(tagKeys.lists(), () => getAllTags()),
    queryClient.prefetchQuery(blacklistKeys.list, () => getBlackList()),
  ]);

  return {
    props: {
      path,
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 60 * 24, // 一个小时
  };
};

const ArticlePage = ({ path }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: article, isLoading } = useArticleByPath(path);
  const { isFallback } = useRouter();
  const { data } = useArticles();
  const relateArticles = data?.data.slice(0, 3) ?? [];

  useEffect(() => {
    if (article) {
      readArticle(article.id);
      gtag.event('article_view', {
        category: GAEventCategories.Article,
        label: article?.title,
      });
    }
  }, [article]);

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
        openGraph={{
          title: article.title,
          description: article.description,
          url: getArticleDetailFullUrl(article.id),
          type: 'article',
          article: {
            publishedTime: article.createAt.toString(),
            modifiedTime: article.updateAt.toString(),
            expirationTime: article.updateAt.toString(),
            authors: [META.url],
            tags: article.tags.map(v => v.name),
          },
          images: [
            {
              url: article.cover,
            },
          ],
        }}
      />
      <ArticleJsonLd
        url={getArticleDetailFullUrl(article.id)}
        title={article.title}
        images={[article.cover]}
        datePublished={article.createAt.toString()}
        dateModified={article.updateAt.toString()}
        authorName={[{ name: article.author, url: META.url }]}
        description={article.description}
        publisherName={article.title}
      />

      <div className='flex flex-row'>
        <div className='max-w-full sm:max-w-3xl'>
          <blockquote>{article.description}</blockquote>

          <Container className='relative rounded-sm'>
            <MarkdownBlock className='my-5' htmlContent={article.htmlContent} />

            <ArticleMeta article={article} />

            <div
              id={ARTICLE_ACTIONS_ELEMENT_ID}
              className='flex w-max scroll-m-20 flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4'
            >
              <FavoriteButton article={article} />
              <Share />
            </div>
          </Container>
        </div>

        <div className='hidden sm:block sm:flex-grow'>
          <ArticleAside article={article} />
        </div>
      </div>

      <div className='max-w-3xl'>
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
