import { EyeOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useState } from 'react';
import Card from '@/components/ui/Card';
import styles from './style.module.scss';

const Item = () => (
  <div className={styles.item}>
    <Image
      src='http://resources.fivewoods.xyz/avatar.jpg'
      alt='cover'
      width={70}
      height={70}
    />
    <span className={styles.title}>title 1</span>
    <span className={styles.right}>
      <EyeOutlined style={{ marginRight: 5 }} />
      132
    </span>
  </div>
);
const LeaderBoard = () => {
  const [loading] = useState(true);
  return (
    <Card title='排行榜' bodyStyle={{ padding: '12px 12px' }}>
      {loading ? '玩命敲代码中...' : <Item />}
    </Card>
  );
};

export default LeaderBoard;
