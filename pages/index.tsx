import Alert from '@/components/Alert';
import ArticleCard from '@/components/Article';
import { Article } from '@/entities/article';
import { SearchResponse } from '@/entities/response/base';
import { SoundOutlined } from '@ant-design/icons';
import { getArticles } from 'api/article';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';

type StaticProps = {
  articles: SearchResponse<Article>;
};
export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const articles = await getArticles();
  return {
    props: {
      articles,
    },
  };
};

const Home = ({ articles }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <Alert
        style={{ marginBottom: 24 }}
        message='公告'
        description='思考比写代码来的更加珍'
        type='info'
        icon={<SoundOutlined />}
        showIcon
      />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          marginLeft: -24,
        }}
      >
        {articles?.data?.map(item => (
          <ArticleCard article={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
