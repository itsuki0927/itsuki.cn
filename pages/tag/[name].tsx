import ArticeList from '@/components/Article';
import Banner from '@/components/Banner';
import AppContext from '@/utils/context';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useContext, useMemo } from 'react';

type StaticProps = {
  name: string;
};
export const getServerSideProps: GetServerSideProps<StaticProps> = async ({ params }) => {
  return {
    props: {
      name: params?.name as string,
    },
  };
};

const TagPage = ({ name }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const context = useContext(AppContext);
  const tag = useMemo(() => {
    return context?.tags?.find(item => item.name === name);
  }, [name, context]);

  return (
    <div>
      <Head>
        <link rel='stylesheet' href='//at.alicdn.com/t/font_2836612_s366q350mh.css' />
      </Head>

      <Banner data={tag} />

      <ArticeList query={{ tag: tag?.id }} />
    </div>
  );
};

export default TagPage;
