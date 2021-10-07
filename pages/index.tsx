import Alert from '@/components/Alert';
import ArticleList from '@/components/Article';
import { SoundOutlined } from '@ant-design/icons';

// type StaticProps = {
//   articles: SearchResponse<Article>;
// };
// export const getStaticProps: GetStaticProps<StaticProps> = async () => {
//   return {
//     props: {
//       articles,
//     },
//   };
// };

// const Home = ({ articles }: InferGetStaticPropsType<typeof getStaticProps>) => {
const Home = () => {
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

      <ArticleList />
    </div>
  );
};

export default Home;
