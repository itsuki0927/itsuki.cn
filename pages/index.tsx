import type { NextPage } from 'next';
import Card from '../components/Card';
import { EyeOutlined, FieldTimeOutlined, HeartOutlined, MessageOutlined } from '@ant-design/icons';

const ArticleCard = () => (
  <Card
    hoverable
    style={{ width: 300, marginBottom: 24, marginLeft: 24, flexGrow: 1 }}
    cover={
      <img
        alt='example'
        src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
      />
    }
    actions={[
      <EyeOutlined key='setting' />,
      <MessageOutlined key='edit' />,
      <HeartOutlined key='ellipsis' />,
      <FieldTimeOutlined key='ellipsis' />,
    ]}
  >
    <Card.Meta title='Card title' description='This is the description' />
  </Card>
);

const Home: NextPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginLeft: -24,
      }}
    >
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
    </div>
  );
};

export default Home;
