import { ReactNode } from 'react';
import { Icon } from '@/components/icons';

interface EmptyProps {
  description?: ReactNode;
  icon?: string;
}

const Empty = ({ description = '暂无数据', icon = 'empty' }: EmptyProps) => (
  <div className='text-center p-4 bg-white'>
    <Icon name={icon} className='text-4xl text-gray-300' />
    <p className='mt-2 mb-0'>{description}</p>
  </div>
);

export default Empty;
