import { EmptyOutlined } from '@/components/icons';
import { Card } from '@/components/ui';
import styles from './style.module.scss';

const Empty = () => (
  <Card className={styles.empty} bodyStyle={{ padding: '12px 0' }}>
    <EmptyOutlined className={styles.icon} />
    <p className={styles.description}>暂无数据</p>
  </Card>
);

export default Empty;
