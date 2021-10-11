import { SoundOutlined } from '@ant-design/icons';
import Alert from '@/components/Alert';
import ArticleList from '@/components/Article';
import HomeSlider from '@/components/Page/home/Slider';

const Home = () => (
  <div>
    <HomeSlider />

    <Alert
      style={{ marginBottom: 24 }}
      message='思考比写代码来的更加珍贵'
      type='info'
      icon={<SoundOutlined />}
      showIcon
    />

    <ArticleList />
  </div>
);

export default Home;
