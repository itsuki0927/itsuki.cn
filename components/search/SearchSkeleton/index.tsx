import React from 'react';
import { Skeleton } from '@/components/ui';

const list = [1, 2, 3];

const SearchSkeleton = () => (
  <div className='flex flex-wrap space-x-6'>
    {list.map(key => (
      <Skeleton key={key} className='flex-grow' height={300} />
    ))}
  </div>
);

export default SearchSkeleton;
