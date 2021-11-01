import { GetStaticPropsContext, InferGetServerSidePropsType } from 'next';
import React, { useMemo } from 'react';
import { NextSeo } from 'next-seo';
import { ArticleList } from '@/components/article';
import { Banner } from '@/components/ui';
import blog from '@/lib/api/blog';
import { Layout } from '@/components/common';

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

const TagPage = ({
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

TagPage.Layout = Layout;

export default TagPage;
