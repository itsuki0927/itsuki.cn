import { ReactNode } from 'react';
import { Icon } from '@/components/icons';
import styles from './style.module.scss';

interface EmptyProps {
  description?: ReactNode;
  icon?: string;
}

const Empty = ({ description = '暂无数据', icon = 'empty' }: EmptyProps) => (
  <div className={styles.empty}>
    <Icon name={icon} className={styles.icon} />
    <p className={styles.description}>{description}</p>
  </div>
);

export default Empty;
