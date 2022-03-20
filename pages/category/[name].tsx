import { GetStaticPropsContext, InferGetServerSidePropsType } from 'next';
import { NextSeo } from 'next-seo';
import { ArticleList } from '@/components/article';
import { Layout } from '@/components/common';
import { Banner } from '@/components/ui';
import blog from '@/lib/api/blog';

export const getStaticPaths = async () => {
  const { categories } = await blog.getAllCategoryPaths();

  const paths = categories.map(category => `/category/${category.path}`);

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const categoryName = (params?.name ?? '') as string;
  const siteInfo = await blog.getSiteInfo();
  const articles = await blog.getAllArticles({
    variables: {
      category: categoryName,
    },
  });

  const category = siteInfo.categories.find(item => item.path === categoryName)!;

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
  category,
  articles,
}: InferGetServerSidePropsType<typeof getStaticProps>) => (
  <>
    <NextSeo
      title={`${category.name} - ${category.path} - Category`}
      description={category.description}
    />

    <Banner className='mb-4' data={category} />

    <ArticleList articles={articles} />
  </>
);

CategoryPage.Layout = Layout;

export default CategoryPage;
