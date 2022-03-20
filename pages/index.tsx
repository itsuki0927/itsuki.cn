import { InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import { Layout } from '@/components/common';
import { SoundOutlined } from '@/components/icons';
import blog from '@/lib/api/blog';

const Alert = ({ message }: { message: string }) => (
  <div className='p-4 bg-blue-50 border-l-4 border-l-blue-500'>
    <SoundOutlined className='text-blue-400 mr-4' />
    <span className='text-blue-500'>{message}</span>
  </div>
);
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
  <div className='home space-y-6'>
    <HomeSlider articles={bannerArticles} />

    <Alert message='思考比写代码来的更加珍贵' />

    <ArticleList articles={articles} />
  </div>
);

HomePage.Layout = Layout;

export default HomePage;
