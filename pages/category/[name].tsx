import { GetStaticPropsContext, InferGetServerSidePropsType } from 'next';
import { useMemo } from 'react';
import { getArticles } from '@/api/article';
import { getCategories } from '@/api/global';
import { ArticleList } from '@/components/article';
import { Banner } from '@/components/ui';
import blog from '@/lib/api/blog';
import { Layout } from '@/components/common';

export const getStaticPaths = async () => {
  const categories = await getCategories();

  const paths = categories.data.map(item => ({
    params: { name: item.path },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const name = (params?.name ?? '') as string;
  const siteInfo = await blog.getSiteInfo();
  const articles = await getArticles({
    category: name,
    pageSize: 2000,
  });

  return {
    props: {
      ...siteInfo,
      name,
      articles,
    },
    revalidate: 10,
  };
};

const CategoryPage = ({
  name,
  articles,
  categories = [],
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const category = useMemo(
    () => categories?.find(item => item.path === name),
    [categories, name]
  );

  return (
    <div>
      <Banner data={category} />

      <ArticleList articles={articles} />
    </div>
  );
};

CategoryPage.Layout = Layout;

export default CategoryPage;
