import { GetStaticPropsContext, InferGetServerSidePropsType } from 'next';
import { NextSeo } from 'next-seo';
import { ReactNode } from 'react';
import { dehydrate, QueryClient } from 'react-query';
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

export const getStaticPaths = async () => {
  const paths = await getAllCategoryPaths();

  return {
    paths,
    fallback: 'blocking',
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
    revalidate: 10,
  };
};

const CategoryPage = ({
  categoryPath,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const articles = useCategoryArticles(categoryPath);
  const { data } = useGlobalData();
  const category = data?.categories
    ? data.categories.find(item => item.path === categoryPath)
    : undefined;
  const icon = getExpandValue(category?.expand ?? '', 'icon');

  if (articles.isFetching || articles.isLoading) {
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
