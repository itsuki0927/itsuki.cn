import { LeftOutlined, RightOutlined } from '@/components/icons';

export interface PaginationProps {
  hasNext?: boolean;
  hasPrev?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
}

const Pagination = ({ hasPrev, hasNext, onNext, onPrev }: PaginationProps) => (
  <div className='flex justify-between'>
    <button type='button' className='px-4 py-3' disabled={!hasPrev} onClick={onPrev}>
      <LeftOutlined />
      NEW POSTS
    </button>
    <button type='button' className='px-4 py-3' disabled={!hasNext} onClick={onNext}>
      OLD POSTS
      <RightOutlined />
    </button>
  </div>
);

export default Pagination;
