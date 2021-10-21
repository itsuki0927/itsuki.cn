import { GetStaticPaths, GetStaticProps, InferGetServerSidePropsType } from 'next';
import { useContext, useMemo } from 'react';
import { getArticles } from '@/api/article';
import { getTags } from '@/api/global';
import ArticeList from '@/components/Article';
import Banner from '@/components/Banner';
import { Article } from '@/entities/article';
import { SearchResponse } from '@/entities/response/base';
import AppContext from '@/utils/context';

type StaticPathProps = {
  name: string;
};

type StaticProps = StaticPathProps & {
  articles: SearchResponse<Article>;
};

export const getStaticPaths: GetStaticPaths<StaticPathProps> = async () => {
  const tags = await getTags();

  const paths = tags.data.map(item => ({
    params: { name: item.name },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<StaticProps> = async ({ params }) => {
  const name = (params?.name ?? '') as string;
  const articles = await getArticles({
    tag: name,
    pageSize: 2000,
  });

  return {
    props: {
      name,
      articles,
    },
    revalidate: 10,
  };
};

const TagPage = ({
  name,
  articles,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const context = useContext(AppContext);
  const tag = useMemo(
    () => context?.tags?.find(item => item.name === name),
    [name, context]
  );

  return (
    <div>
      <Banner data={tag} />

      <ArticeList articles={articles} />
    </div>
  );
};

export default TagPage;
