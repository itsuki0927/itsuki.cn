import classNames from 'classnames';
import { LeftOutlined, RightOutlined } from '@/components/icons';
import scrollTo from '@/utils/scrollTo';
import { gtag } from '@/utils/gtag';
import { GAEventCategories } from '@/constants/gtag';

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
        gtag.event('prev_articles', {
          category: GAEventCategories.Index,
        });
        scrollTo('#dashboard', 300, {
          offset: -80,
        });
      }}
      className={classNames(
        'capsize flex items-center rounded-sm px-4 py-2 text-sm tracking-widest transition-colors duration-300 ',
        !hasPrev
          ? 'cursor-not-allowed text-gray-1'
          : 'bg-white text-primary hover:bg-primary hover:text-white'
      )}
    >
      <LeftOutlined className='mr-2 text-xxs' />
      <span className='capsize'>以后</span>
    </button>
    <button
      type='button'
      disabled={!hasNext}
      onClick={() => {
        onChange(1);
        gtag.event('next_articles', {
          category: GAEventCategories.Index,
        });
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
      <span className='capsize'>以前</span>
      <RightOutlined className='ml-2 text-xxs' />
    </button>
  </div>
);

export default ArticleListPagination;
