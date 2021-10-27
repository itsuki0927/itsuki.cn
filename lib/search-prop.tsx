import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import blog from './api/blog';

export const getSearchStaticProps = async ({
  locale = 'cn-zh',
}: GetStaticPropsContext) => {
  const siteInfo = await blog.getSiteInfo();

  return {
    props: {
      locale,
      ...siteInfo,
    },
    revalidate: 200,
  };
};

export type SearchPropsType = InferGetStaticPropsType<typeof getSearchStaticProps>;
