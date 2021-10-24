import { SoundOutlined } from '@ant-design/icons';
import { GetStaticProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import { getArticles } from '@/api/article';
import { Article } from '@/entities/article';
import { SearchResponse } from '@/entities/response/base';

const Alert = dynamic(() => import('@/components/ui/Alert'));
const ArticleList = dynamic(() => import('@/components/article/ArticleList'));
const HomeSlider = dynamic(() => import('@/components/common/HomeSlider'));

type StaticProps = {
  articles: SearchResponse<Article>;
  bannerArticles: SearchResponse<Article>;
};
export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const articles = await getArticles({ pageSize: 2000, publish: 1 });
  const bannerArticles = await getArticles({ publish: 1, banner: 1 });

  return {
    props: {
      articles,
      bannerArticles,
    },
    revalidate: 10,
  };
};

const HomePage = ({
  articles,
  bannerArticles,
}: InferGetServerSidePropsType<typeof getStaticProps>) => (
  <div className='home'>
    <HomeSlider articles={bannerArticles} />

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
