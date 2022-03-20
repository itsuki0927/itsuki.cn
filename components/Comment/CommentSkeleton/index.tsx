import React from 'react';
import { Skeleton } from '@/components/ui';

const list = [1, 2, 3, 4];

const CommentSkeleton = () => (
  <div className='space-x-3 bg-white p-3'>
    {list.map(item => (
      <Skeleton height={100} key={item} />
    ))}
  </div>
);

export default CommentSkeleton;
