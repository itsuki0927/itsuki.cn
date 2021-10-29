import React from 'react';
import { Skeleton } from '@/components/ui';
import s from './style.module.scss';

const list = [1, 2, 3, 4];

const SearchSkeleton = () => (
  <div className={s.searchSkeleton}>
    {list.map(key => (
      <Skeleton key={key} className={s.item} width={200} height={300} />
    ))}
  </div>
);

export default SearchSkeleton;
