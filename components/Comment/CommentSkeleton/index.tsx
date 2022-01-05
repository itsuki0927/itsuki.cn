import React from 'react';
import { Skeleton } from '@/components/ui';
import styles from './style.module.scss';

const list = [1, 2, 3, 4];

const CommentSkeleton = () => (
  <div className={styles.commentSkeleton}>
    {list.map(item => (
      <Skeleton height={100} className={styles.item} key={item} />
    ))}
  </div>
);

export default CommentSkeleton;
