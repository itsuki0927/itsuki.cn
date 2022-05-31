import { GetStaticPropsContext, InferGetServerSidePropsType } from 'next';
import { NextSeo } from 'next-seo';
import { ReactNode } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { getArticles } from '@/api/article';
import { getAllCategoryPaths } from '@/api/category';
import { getGlobalData } from '@/api/global';
import { ArticleList, ArticleSkeletonList } from '@/components/article';
import { Layout } from '@/components/common';
import { Banner, BannerSkeleton } from '@/components/ui';
import { articleKeys, globalDataKeys } from '@/constants/queryKeys';
import { useCategoryArticles } from '@/hooks/article';
import { useGlobalData } from '@/hooks/globalData';
import { getExpandValue } from '@/utils/expands';
import { Icon } from '@/components/icons';
import { useMount } from '@/hooks';
import { gtag } from '@/utils/gtag';
import { GAEventCategories } from '@/constants/gtag';

export const getStaticPaths = async () => {
  const paths = await getAllCategoryPaths();

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const categoryPath = (params?.name ?? '').toString();

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(globalDataKeys.globalData, () => getGlobalData());
  await queryClient.prefetchQuery(articleKeys.category(categoryPath), () =>
    getArticles({ categoryPath })
  );

  return {
    props: {
      categoryPath,
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 60 * 24, // 一个小时
  };
};

const CategoryPage = ({
  categoryPath,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const articles = useCategoryArticles(categoryPath);
  const { isFallback } = useRouter();
  const { data } = useGlobalData();
  const category = data?.categories?.find(item => item.path === categoryPath);
  const icon = getExpandValue(category?.expand ?? '', 'icon');

  useMount(() => {
    gtag.event('category_view', {
      category: GAEventCategories.Category,
      label: category?.name,
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
        title={`${category?.name} - ${category?.path} - Category`}
        description={category?.description}
      />

      <Banner
        title={`分类: ${category?.name}`}
        description={category?.description}
        icon={<Icon name={icon} />}
      />

      <ArticleList {...articles} />
    </div>
  );
};

CategoryPage.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

export default CategoryPage;
