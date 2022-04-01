import { GetStaticPropsContext, InferGetServerSidePropsType } from 'next';
import { NextSeo } from 'next-seo';
import { useMemo } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { getArticles } from '@/api/article';
import { getGlobalData } from '@/api/global';
import { getAllTagPaths } from '@/api/tag';
import { ArticleCard } from '@/components/article';
import { HijackRender, Layout } from '@/components/common';
import { Banner } from '@/components/ui';
import { articleKeys, globalDataKeys } from '@/constants/queryKeys';
import { SiteInfo } from '@/entities/siteInfo';
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
  const tagName = (params?.name ?? '') as string;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(globalDataKeys.globalData, () => getGlobalData());
  await queryClient.prefetchQuery(articleKeys.tag(tagName), () =>
    getArticles({ tag: tagName })
  );

  return {
    props: {
      tagName,
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10,
  };
};

type UseTagHook = {
  tags: SiteInfo['tags'] | undefined;
  tagName: string;
};

const useTag = ({ tags, tagName }: UseTagHook) => {
  const tag = useMemo(
    () => (tags ? tags.find(item => item.path === tagName) : undefined),
    [tags, tagName]
  );
  return tag;
};

const ArticleTagPage = ({
  tagName,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const articles = useTagArticles(tagName);
  const { data } = useGlobalData();
  const tag = useTag({ tags: data?.tags, tagName });

  return (
    <>
      <NextSeo
        title={`${tag?.name} - ${tag?.path} - Tag`}
        description={tag?.description}
      />

      <Banner data={tag} className='mb-6' />

      <HijackRender {...articles} className='space-y-6'>
        {articles.data?.data.map(article => (
          <ArticleCard article={article} key={article.id} />
        ))}
      </HijackRender>
    </>
  );
};

ArticleTagPage.Layout = Layout;

export default ArticleTagPage;
