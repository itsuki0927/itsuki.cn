import Alert from '@/components/Alert';
import { Article } from '@/entities/article';
import { SearchResponse } from '@/entities/response/base';
import { EyeOutlined, HeartOutlined, MessageOutlined, SoundOutlined } from '@ant-design/icons';
import { getArticles } from 'api/article';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Card from '../components/Card';

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

type ArticleCardProps = {
  article: Article;
};
const ArticleCard = ({ article }: ArticleCardProps) => (
  <Card
    hoverable
    style={{ width: 300, marginBottom: 24, marginLeft: 24, flexGrow: 1 }}
    cover={<img alt='example' height={312} style={{ objectFit: 'cover' }} src={article.cover} />}
    actions={[
      <span key='reading'>
        <EyeOutlined style={{ marginRight: 5 }} />
        {article.reading}
      </span>,
      <span key='commenting'>
        <MessageOutlined style={{ marginRight: 5 }} />
        {article.commenting}
      </span>,
      <span key='liking'>
        <HeartOutlined style={{ marginRight: 5 }} />
        {article.liking}
      </span>,
    ]}
  >
    <Card.Meta title={article.title} description={article.description} />
  </Card>
);

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
