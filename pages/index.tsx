import { InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import { Layout } from '@/components/common';
import { SoundOutlined } from '@/components/icons';
import blog from '@/lib/api/blog';

const Alert = dynamic(() => import('@/components/ui/Alert'));
const ArticleList = dynamic(() => import('@/components/article/ArticleList'));
const HomeSlider = dynamic(() => import('@/components/common/HomeSlider'));

export const getStaticProps = async () => {
  const articles = await blog.getAllArticles({
    variables: {
      pinned: true,
    },
  });
  const siteInfo = await blog.getSiteInfo();
  const bannerArticles = await blog.getAllArticles({
    variables: {
      banner: true,
    },
  });

  return {
    props: {
      ...siteInfo,
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
      style={{ marginBottom: 24, padding: '8px 24px' }}
      message='思考比写代码来的更加珍贵'
      type='info'
      icon={<SoundOutlined />}
      showIcon
      banner
    />

    <ArticleList articles={articles} />
  </div>
);

HomePage.Layout = Layout;

export default HomePage;
