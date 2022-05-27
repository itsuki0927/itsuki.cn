import classNames from 'classnames';
import { LeftOutlined, RightOutlined } from '@/components/icons';
import scrollTo from '@/utils/scrollTo';

interface ArticleListPaginationProps {
  hasPrev?: boolean;
  hasNext?: boolean;
  onChange: (num: number) => void;
}

const ArticleListPagination = ({
  hasNext,
  hasPrev,
  onChange,
}: ArticleListPaginationProps) => (
  <div className='flex justify-between'>
    <button
      type='button'
      disabled={!hasPrev}
      onClick={() => {
        onChange(-1);
        scrollTo('#dashboard', 300, {
          offset: -80,
        });
      }}
      className={classNames(
        'flex items-center rounded-sm px-4 py-2 text-sm tracking-widest transition-colors duration-300 ',
        !hasPrev
          ? 'cursor-not-allowed text-gray-1'
          : 'bg-white text-primary hover:bg-primary hover:text-white'
      )}
    >
      <LeftOutlined className='mr-2 text-xxs' />
      以后
    </button>
    <button
      type='button'
      disabled={!hasNext}
      onClick={() => {
        onChange(1);
        scrollTo('#dashboard', 300, {
          offset: -80,
        });
      }}
      className={classNames(
        'flex items-center rounded-sm px-4 py-2 text-sm tracking-widest transition-colors duration-300',
        !hasNext
          ? 'cursor-not-allowed text-gray-1'
          : 'bg-white text-primary hover:bg-primary hover:text-white'
      )}
    >
      以前
      <RightOutlined className='ml-2 text-xxs' />
    </button>
  </div>
);

export default ArticleListPagination;
