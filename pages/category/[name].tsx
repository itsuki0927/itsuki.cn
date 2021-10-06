import { getArticles } from '@/api/article';
import ArticleList from '@/components/Article/List';
import Card from '@/components/Card';
import Banner from '@/components/Pages/Category/Banner';
import { Article } from '@/entities/article';
import { SearchResponse } from '@/entities/response/base';
import AppContext from '@/utils/context';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useContext, useMemo } from 'react';

type StaticProps = {
  articles: SearchResponse<Article>;
  name: string;
};
export const getServerSideProps: GetServerSideProps<StaticProps> = async ({ params }) => {
  const articles = await getArticles({ category: 2, pageSize: 2 });
  return {
    props: {
      articles,
      name: params?.name as string,
    },
  };
};

const Category = ({ articles, name }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const context = useContext(AppContext);
  const category = useMemo(() => {
    console.log('context', context);
    return context?.categories?.find(item => item.path === name);
  }, [name, context]);

  console.log('category', category);

  return (
    <div>
      <Head>
        <link rel='stylesheet' href='//at.alicdn.com/t/font_2836612_bmgp99va00d.css' />
      </Head>

      <Banner category={category} />

      <ArticleList articles={articles} />
    </div>
  );
};

export default Category;
