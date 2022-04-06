import { Icon } from '@/components/icons';

interface EmptyProps {
  icon?: string;
}

const Empty = ({ icon = 'empty' }: EmptyProps) => (
  <div className='bg-white p-4 text-center'>
    <Icon name={icon} className='text-4xl text-[#b6b6b6]' />
    <p className='mt-1 text-sm tracking-widest text-[#777]'>
      不找了, 找不到了, 这世界已经疯了
      <span className='absolute mt-1 text-xs text-[#b6b6b6]'>《不找了》</span>
    </p>
  </div>
);

export default Empty;
