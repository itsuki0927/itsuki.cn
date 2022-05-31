import { GetStaticPropsContext, InferGetServerSidePropsType } from 'next';
import { NextSeo } from 'next-seo';
import { ReactNode } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { getArticles } from '@/api/article';
import { getGlobalData } from '@/api/global';
import { getAllTagPaths } from '@/api/tag';
import { ArticleList, ArticleSkeletonList } from '@/components/article';
import { Layout } from '@/components/common';
import { Banner, BannerSkeleton } from '@/components/ui';
import { articleKeys, globalDataKeys } from '@/constants/queryKeys';
import { useTagArticles } from '@/hooks/article';
import { useGlobalData } from '@/hooks/globalData';
import { getExpandValue } from '@/utils/expands';
import { Icon } from '@/components/icons';
import { useMount } from '@/hooks';
import { gtag } from '@/utils/gtag';
import { GAEventCategories } from '@/constants/gtag';

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
  await queryClient.prefetchQuery(globalDataKeys.globalData, () => getGlobalData());
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
  const { data } = useGlobalData();
  const { isFallback } = useRouter();
  const tag = data?.tags ? data.tags.find(item => item.path === tagPath) : undefined;
  const icon = getExpandValue(tag?.expand ?? '', 'icon');

  useMount(() => {
    gtag.event('tag_view', {
      category: GAEventCategories.Tag,
      label: tag?.name,
    });
  });

  if (isFallback || articles.isFetching || articles.isLoading) {
    return (
      <div className='space-y-6'>
        <BannerSkeleton />

        <ArticleSkeletonList />
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <NextSeo
        title={`${tag?.name} - ${tag?.path} - Tag`}
        description={tag?.description}
      />

      <Banner
        title={`标签: ${tag?.name}`}
        description={tag?.description}
        icon={<Icon name={icon} />}
      />

      <ArticleList {...articles} />
    </div>
  );
};

ArticleTagPage.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

export default ArticleTagPage;
