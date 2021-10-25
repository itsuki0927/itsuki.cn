import { GetStaticPropsContext, InferGetServerSidePropsType } from 'next';
import { useMemo } from 'react';
import { getArticles } from '@/api/article';
import { getTags } from '@/api/global';
import { ArticleList } from '@/components/article';
import { Banner } from '@/components/ui';
import blog from '@/lib/api/blog';

export const getStaticPaths = async () => {
  const tags = await getTags();

  const paths = tags.data.map(item => ({
    params: { name: item.name },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const name = (params?.name ?? '') as string;
  const articles = await getArticles({
    tag: name,
    pageSize: 2000,
  });
  const siteInfo = await blog.getSiteInfo();

  return {
    props: {
      ...siteInfo,
      name,
      articles,
    },
    revalidate: 10,
  };
};

const TagPage = ({
  name,
  articles,
  tags = [],
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const tag = useMemo(() => tags?.find(item => item.name === name), [name, tags]);

  return (
    <div>
      <Banner data={tag} />

      <ArticleList articles={articles} />
    </div>
  );
};

export default TagPage;
