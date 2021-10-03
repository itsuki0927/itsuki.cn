import { Article } from '@/entities/article';
import Card from '@/components/Card';
import { getArticleById } from 'api/article';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import marked from '@/utils/marked';

type StaticProps = {
  article: Article;
};

export const getServerSideProps: GetServerSideProps<StaticProps> = async ({ params }) => {
  const article = await getArticleById(params?.id as string);

  return {
    props: {
      article,
    },
  };
};

const ArticlePage = ({ article }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <Card style={{ marginBottom: 24 }}>
        <h1>{article.title}</h1>

        <div
          className='markdown-html'
          dangerouslySetInnerHTML={{ __html: marked(article.content) }}
        />
      </Card>

      <Card></Card>
    </div>
  );
};

export default ArticlePage;
