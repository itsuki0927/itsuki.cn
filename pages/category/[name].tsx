import { GetStaticPropsContext, InferGetServerSidePropsType } from 'next';
import { useMemo } from 'react';
import { ArticleList } from '@/components/article';
import { Banner } from '@/components/ui';
import blog from '@/lib/api/blog';
import { Layout } from '@/components/common';

export const getStaticPaths = async () => {
  const { categories } = await blog.getAllCategoryPaths();

  const paths = categories.map(category => `/category/${category}`);

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const category = (params?.name ?? '') as string;
  const siteInfo = await blog.getSiteInfo();
  const articles = await blog.getAllArticles({
    variables: {
      category,
    },
  });

  return {
    props: {
      ...siteInfo,
      category,
      articles,
    },
    revalidate: 10,
  };
};

const CategoryPage = ({
  category: categoryName,
  articles,
  categories = [],
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const category = useMemo(
    () => categories.find(item => item.path === categoryName),
    [categories, categoryName]
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
