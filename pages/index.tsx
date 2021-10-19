import { SoundOutlined } from '@ant-design/icons';
import { GetStaticProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import { getArticles } from '@/api/article';
import { Article } from '@/entities/article';
import { SearchResponse } from '@/entities/response/base';

const Alert = dynamic(() => import('@/components/Alert'));
const ArticleList = dynamic(() => import('@/components/Article'));
const HomeSlider = dynamic(() => import('@/components/Page/home/Slider'));

type StaticProps = {
  articles: SearchResponse<Article>;
};
export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const articles = await getArticles({
    pageSize: 2000,
  });

  return {
    props: {
      articles,
    },
  };
};

const HomePage = ({ articles }: InferGetServerSidePropsType<typeof getStaticProps>) => (
  <div className='home'>
    <HomeSlider />

    <Alert
      style={{ marginBottom: 24 }}
      message='思考比写代码来的更加珍贵'
      type='info'
      icon={<SoundOutlined />}
      showIcon
    />

    <ArticleList articles={articles} />
  </div>
);

export default HomePage;
