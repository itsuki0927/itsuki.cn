import { Button } from '@/components/ui';

export interface PaginationProps {
  hasNext?: boolean;
  hasPrev?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
}

const Pagination = ({ hasPrev, hasNext, onNext, onPrev }: PaginationProps) => (
  <div className='flex justify-between'>
    <Button className='px-4 py-3' disabled={!hasPrev} onClick={onPrev}>
      {`<`} NEW POSTS
    </Button>
    <Button className='px-4 py-3' disabled={!hasNext} onClick={onNext}>
      OLD POSTS {`>`}
    </Button>
  </div>
);

export default Pagination;
