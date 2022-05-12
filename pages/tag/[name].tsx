import { GetStaticPropsContext, InferGetServerSidePropsType } from 'next';
import { NextSeo } from 'next-seo';
import { ReactNode } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { getArticles } from '@/api/article';
import { getGlobalData } from '@/api/global';
import { getAllTagPaths } from '@/api/tag';
import { ArticleList } from '@/components/article';
import { Layout } from '@/components/common';
import { Banner, Loading } from '@/components/ui';
import { articleKeys, globalDataKeys } from '@/constants/queryKeys';
import { useTagArticles } from '@/hooks/article';
import { useGlobalData } from '@/hooks/globalData';

export const getStaticPaths = async () => {
  const paths = await getAllTagPaths();

  return {
    paths,
    fallback: 'blocking',
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
    revalidate: 10,
  };
};

const ArticleTagPage = ({
  tagPath,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const articles = useTagArticles(tagPath);
  const { data } = useGlobalData();
  const tag = data?.tags ? data.tags.find(item => item.path === tagPath) : undefined;

  if (articles.isFetching || articles.isLoading) {
    return <Loading />;
  }

  return (
    <>
      <NextSeo
        title={`${tag?.name} - ${tag?.path} - Tag`}
        description={tag?.description}
      />

      <Banner className='mb-6'>标签: {tag?.name}</Banner>

      <ArticleList {...articles} />
    </>
  );
};

ArticleTagPage.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

export default ArticleTagPage;
