import { GetStaticPropsContext, InferGetServerSidePropsType } from 'next';
import { NextSeo } from 'next-seo';
import React, { useMemo } from 'react';
import { ArticleList } from '@/components/article';
import { Layout } from '@/components/common';
import { Banner } from '@/components/ui';
import blog from '@/lib/api/blog';

export const getStaticPaths = async () => {
  const { tags } = await blog.getAllTagPaths();
  const paths = tags.map(tag => `/tag/${tag.name}`);

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const tag = (params?.name ?? '') as string;
  const articles = await blog.getAllArticles({
    variables: {
      tag,
    },
  });
  const siteInfo = await blog.getSiteInfo();

  return {
    props: {
      ...siteInfo,
      tag,
      articles,
    },
    revalidate: 10,
  };
};

const ArticleTagPage = ({
  tag: name,
  articles,
  tags = [],
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const tag = useMemo(() => tags.find(item => item.name === name), [name, tags]);

  return (
    <div>
      <NextSeo
        title={`${tag?.name} - ${tag?.path} - Tag`}
        description={tag?.description}
      />
      <Banner data={tag} />

      <ArticleList articles={articles} />
    </div>
  );
};

ArticleTagPage.Layout = Layout;

export default ArticleTagPage;
