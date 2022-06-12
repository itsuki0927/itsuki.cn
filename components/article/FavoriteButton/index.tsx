import classNames from 'classnames';
import { LikeFilled, LikeOutlined } from '@/components/icons';

interface FavoriteButtonProps {
  liking?: number;
  isLike?: boolean;
  onLike?: () => void;
}

const FavoriteButton = ({ isLike, liking, onLike }: FavoriteButtonProps) => {
  const handleLike = () => {
    if (isLike) return;

    onLike?.();
  };

  return (
    <button
      aria-label='favorite article'
      type='button'
      className={classNames(
        'flex flex-grow items-center justify-center rounded-sm bg-danger px-6 py-2 text-sm font-medium text-white outline-none sm:max-w-[140px]',
        isLike
          ? 'cursor-not-allowed'
          : 'transition-colors duration-300 hover:bg-danger-hover'
      )}
      onClick={handleLike}
    >
      {isLike ? <LikeFilled className='mr-2' /> : <LikeOutlined className='mr-2' />}
      <strong className='capsize font-medium'>{liking}</strong>
    </button>
  );
};

export default FavoriteButton;
