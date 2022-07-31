import { GetStaticPropsContext, InferGetServerSidePropsType } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from 'react-query';
import { getArticles } from '@/api/article';
import { getAllTagPaths, getAllTags } from '@/api/tag';
import { ArticleList, ArticleSkeletonList } from '@/components/article';
import { Layout, Navbar } from '@/components/common';
import { Banner, BannerSkeleton } from '@/components/ui';
import { GAEventCategories } from '@/constants/gtag';
import { articleKeys, tagKeys } from '@/constants/queryKeys';
import { useMount } from '@/hooks';
import { useTagArticles } from '@/hooks/article';
import useTags from '@/hooks/tag';
import { gtag } from '@/utils/gtag';

export const getStaticPaths = async () => {
  const paths = await getAllTagPaths();

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const tagPath = (params?.name ?? '') as string;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(tagKeys.lists(), () => getAllTags());
  await queryClient.prefetchQuery(articleKeys.tag(tagPath), () =>
    getArticles({ tagPath })
  );

  return {
    props: {
      tagPath,
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 200,
  };
};

const ArticleTagPage = ({
  tagPath,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const articles = useTagArticles(tagPath);
  const { data } = useTags();
  const { isFallback } = useRouter();
  const tag = data ? data.find(item => item.path === tagPath) : undefined;

  useMount(() => {
    gtag.event('tag_view', {
      category: GAEventCategories.Tag,
      label: tag?.name,
    });
  });

  if (isFallback || articles.isFetching || articles.isLoading) {
    return (
      <Layout>
        <div className='space-y-6'>
          <BannerSkeleton />
          <ArticleSkeletonList />
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      hero={
        <div className='space-y-20 bg-white py-10'>
          <Navbar />
          <Banner
            className='container'
            title={`标签: ${tag?.name} (${tag?.count})`}
            description={tag?.description}
          />
        </div>
      }
    >
      <div className='space-y-6'>
        <NextSeo title={tag?.name} />

        <ArticleList {...articles} />
      </div>
    </Layout>
  );
};

export default ArticleTagPage;
