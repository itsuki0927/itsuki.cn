import { GetStaticPropsContext, InferGetServerSidePropsType } from 'next';
import { NextSeo } from 'next-seo';
import { useMemo } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { getArticles } from '@/api/article';
import { getAllCategoryPaths } from '@/api/category';
import { getGlobalData } from '@/api/global';
import { ArticleCard } from '@/components/article';
import { HijackRender, Layout } from '@/components/common';
import { Banner } from '@/components/ui';
import { articleKeys, globalDataKeys } from '@/constants/queryKeys';
import { SiteInfo } from '@/entities/siteInfo';
import { useCategoryArticles } from '@/hooks/article';
import { useGlobalData } from '@/hooks/globalData';

export const getStaticPaths = async () => {
  const paths = await getAllCategoryPaths();

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const categoryName = (params?.name ?? '').toString();

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(globalDataKeys.globalData, () => getGlobalData());
  await queryClient.prefetchQuery(articleKeys.category(categoryName), () =>
    getArticles({ category: categoryName })
  );

  return {
    props: {
      categoryName,
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10,
  };
};

type UseCategoryHook = {
  categories: SiteInfo['categories'] | undefined;
  name: string;
};

const useCategory = ({ categories, name }: UseCategoryHook) => {
  const tag = useMemo(
    () => (categories ? categories.find(item => item.path === name) : undefined),
    [categories, name]
  );
  return tag;
};

const CategoryPage = ({
  categoryName,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const articles = useCategoryArticles(categoryName);
  const { data } = useGlobalData();
  const category = useCategory({ categories: data?.categories, name: categoryName });

  return (
    <>
      <NextSeo
        title={`${category?.name} - ${category?.path} - Category`}
        description={category?.description}
      />

      <Banner className='mb-6' data={category} />

      <HijackRender {...articles} className='space-y-6'>
        {articles.data?.data.map(article => (
          <ArticleCard article={article} key={article.id} />
        ))}
      </HijackRender>
    </>
  );
};

CategoryPage.Layout = Layout;

export default CategoryPage;
