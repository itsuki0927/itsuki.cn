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
      className='flex flex-row'
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

        <ArticlePagination
          prevArticle={article.prevArticle}
          nextArticle={article.nextArticle}
        />

        <RelateArticles relateArticles={relateArticles} />

        <CommentView articleId={article.id} />
      </div>

      <div className='hidden sm:block sm:flex-grow'>
        <ArticleAside article={article} />
      </div>
    </Layout>
  );
};

export default ArticlePage;
