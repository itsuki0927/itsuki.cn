import { dehydrate, QueryClient } from 'react-query';
import { useMemo } from 'react';
import { GetStaticPropsContext, InferGetServerSidePropsType } from 'next';
import { NextSeo } from 'next-seo';
import { ArticleCard } from '@/components/article';
import { HijackRender, Layout } from '@/components/common';
import { Banner } from '@/components/ui';
import blog from '@/lib/api/blog';
import { useTagArticles } from '@/hooks/article';
import { articleKeys } from '@/constants/queryKeys';
import { getGlobalData } from '@/api/global';
import { useGlobalData } from '@/hooks/globalData';
import { SiteInfo } from '@/entities/siteInfo';
import { getArticles } from '@/api/article';

export const getStaticPaths = async () => {
  const { tags } = await blog.getAllTagPaths();
  const paths = tags.map(tag => `/tag/${tag.path}`);

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const tagName = (params?.name ?? '') as string;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('globalData', () => getGlobalData());
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
