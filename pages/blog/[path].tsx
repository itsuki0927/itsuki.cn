import { MessageSquare } from 'react-feather';
import Link from 'next/link';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { getAllArticlePathsWithPath, getArticle, readArticle } from '@/api/article';
import { getBlackList } from '@/api/blacklist';
import { getAllTags } from '@/api/tag';
import { ArticleSkeleton } from '@/components/article';
import ArticleAside from '@/components/article/ArticleAside';
import ArticleHeader from '@/components/article/ArticleHeader';
import ArticleMeta from '@/components/article/ArticleMeta';
import RelateArticles, {
  RelateArticleSkeleton,
} from '@/components/article/RelateArticles';
import {
  CommentFormSkeletion,
  CommentListSkeleton,
  CommentView,
} from '@/components/comment';
import { CountDown, Layout, MyImage, Share, ToDate } from '@/components/common';
import { Container, MarkdownBlock } from '@/components/ui';
import { META } from '@/configs/app';
import { GAEventCategories } from '@/constants/gtag';
import { articleKeys, blacklistKeys, tagKeys } from '@/constants/queryKeys';
import { useArticles, useArticle } from '@/hooks/article';
import { gtag } from '@/utils/gtag';
import { getArticleDetailFullUrl, getTagRoute } from '@/utils/url';
import FavoriteButton from '@/components/article/FavoriteButton';
import { COMMENT_VIEW_ELEMENT_ID } from '@/constants/anchor';
import { useScrollTo } from '@/hooks';

export const getStaticPaths = async () => {
  const paths = await getAllArticlePathsWithPath();

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const path = String(params?.path);

  if (!path) {
    return {
      notFound: true,
    };
  }

  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery(articleKeys.detailByPath(path), () => getArticle(path)),
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
  const { data: article, isLoading } = useArticle(path);
  const { isFallback } = useRouter();
  const { data } = useArticles();
  const relateArticles = data?.data.slice(0, 3) ?? [];
  const { scrollTo } = useScrollTo();

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
    <Layout footerTheme='reverse'>
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

      <ArticleHeader article={article} />

      <Container className='relative mt-24 flex flex-row justify-between'>
        <div className='absolute -left-14 sm:h-full sm:max-w-xs'>
          <div className='sticky top-16 left-0'>
            <Share>
              <FavoriteButton article={article} />
              <span className='flex flex-col justify-center'>
                <button
                  aria-label='article comments'
                  type='button'
                  className='flex items-center justify-center rounded-md bg-white px-2 py-2 font-medium text-gray-400 shadow-md outline-none'
                  onClick={() => scrollTo(COMMENT_VIEW_ELEMENT_ID)}
                >
                  <MessageSquare />
                </button>
                <strong className='capsize mt-1 text-center text-sm font-medium'>
                  <CountDown num={article.commenting} />
                </strong>
              </span>
            </Share>
          </div>
        </div>
        <div className='max-w-full sm:max-w-3xl'>
          <div className='relative rounded-sm'>
            <div className='mb-8 align-middle'>
              <MyImage
                src={article.cover}
                width={1216}
                height={516}
                objectFit='cover'
                alt='article-header-cover'
                className='cursor-pointer'
                id='articleCover'
              />
            </div>
            <MarkdownBlock htmlContent={article.htmlContent} />

            <ArticleMeta article={article} />
          </div>
        </div>

        <div className='hidden sm:block sm:max-w-xs sm:flex-grow'>
          <ul className='space-y-2 bg-gray-50 p-6'>
            <p className='mb-4 font-medium text-primary'>基本信息</p>
            <li className='flex items-center justify-between'>
              <span className='text-sm text-gray-400'>作者</span>

              <Link href='/about'>
                <span className='cursor-pointer text-sm transition-colors hover:text-primary'>
                  {article.author}
                </span>
              </Link>
            </li>

            <li className='flex items-center justify-between'>
              <span className='text-sm text-gray-400'>标签</span>

              <div className='space-x-2'>
                {article.tags.map(tag => (
                  <Link key={tag.path} href={getTagRoute(tag.path)}>
                    <span className='cursor-pointer text-sm transition-all hover:underline'>
                      {tag.name}
                    </span>
                  </Link>
                ))}
              </div>
            </li>

            <li className='flex items-center justify-between'>
              <span className='text-sm text-gray-400'>发布时间</span>

              <span className='text-sm'>
                <ToDate date={article.createAt} to='YMDm' />
              </span>
            </li>

            <li className='flex items-center justify-between'>
              <span className='text-sm text-gray-400'>最后修改</span>

              <span className='text-sm'>
                <ToDate date={article.updateAt} to='YMDm' />
              </span>
            </li>
          </ul>
          <ArticleAside article={article} />
        </div>
      </Container>

      <Container className='my-24 border-t border-dashed border-gray-300' />

      <RelateArticles relateArticles={relateArticles} />

      <Container className='my-24' id={COMMENT_VIEW_ELEMENT_ID}>
        <h3 className='mb-6 text-2xl text-gray-900'>相关评论</h3>
        <CommentView articleId={article.id} />
      </Container>
    </Layout>
  );
};

export default ArticlePage;
