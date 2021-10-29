import React from 'react';
import { Card, Skeleton } from '@/components/ui';
import styles from './style.module.scss';

const list = [1, 2, 3, 4];

const CommentSkeleton = () => (
  <Card title={<Skeleton />} className={styles.commentSkeleton}>
    {list.map(item => (
      <div key={item} className={styles.item}>
        <Skeleton height={100} />
      </div>
    ))}
  </Card>
);

export default CommentSkeleton;
