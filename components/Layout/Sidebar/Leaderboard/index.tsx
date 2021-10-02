import Card from '@/components/Card';
import { EyeOutlined } from '@ant-design/icons';
import Image from 'next/image';
import styles from './style.module.scss';

const Item = () => {
  return (
    <div className={styles.item}>
      <Image src='http://resources.fivewoods.xyz/avatar.jpg' alt='cover' width={70} height={70} />
      <span className={styles.title}>title 1</span>
      <span className={styles.right}>
        <EyeOutlined style={{ marginRight: 5 }} />
        132
      </span>
    </div>
  );
};
const LeaderBoard = () => {
  return (
    <Card title='排行榜' bodyStyle={{ padding: '12px 12px' }}>
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </Card>
  );
};

export default LeaderBoard;
