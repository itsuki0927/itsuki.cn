import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { getCategories, getTags } from '@/api/global';

export const getSearchStaticProps = async ({ locale }: GetStaticPropsContext) => {
  const { data: tags } = await getTags();
  const { data: categories } = await getCategories();

  return {
    props: {
      tags,
      categories,
      locale,
    },
    revalidate: 200,
  };
};

export type SearchPropsType = InferGetStaticPropsType<typeof getSearchStaticProps>;
