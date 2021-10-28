import { Icon } from '@/components/icons';
import { Card } from '@/components/ui';
import styles from './style.module.scss';

const Empty = () => (
  <Card className={styles.empty} bodyStyle={{ padding: '12px 0' }}>
    <Icon name='empty' className={styles.icon} />
    <p>暂无数据</p>
  </Card>
);

export default Empty;
