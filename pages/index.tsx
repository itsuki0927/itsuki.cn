import { SoundOutlined } from '@ant-design/icons';
import Alert from '@/components/Alert';
import ArticleList from '@/components/Article';

const Home = () => (
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

export default Home;
