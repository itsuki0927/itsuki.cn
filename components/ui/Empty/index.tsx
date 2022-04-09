import { Icon } from '@/components/icons';
import Container from '../Container';

interface EmptyProps {
  icon?: string;
}

const Empty = ({ icon = 'empty' }: EmptyProps) => (
  <Container className='text-center'>
    <Icon name={icon} className='text-4xl text-gray-1 dark:text-gray-1--dark' />
    <p className='mt-1 text-sm tracking-widest text-gray-3 dark:text-gray-3--dark'>
      不找了, 找不到了, 这世界已经疯了
      <span className='absolute mt-1 text-xs text-gray-1 dark:text-gray-1--dark'>
        《不找了》
      </span>
    </p>
  </Container>
);

export default Empty;
