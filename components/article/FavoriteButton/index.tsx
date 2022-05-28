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
      type='button'
      className={classNames(
        'flex items-center rounded-sm bg-danger px-6 py-2 text-sm font-medium text-white outline-none',
        isLike
          ? 'cursor-not-allowed'
          : 'transition-colors duration-300 hover:bg-danger-hover'
      )}
      onClick={handleLike}
    >
      {isLike ? <LikeFilled className='text-white' /> : <LikeOutlined />}
      <strong className='capsize ml-2 mr-1 text-white'>{liking}</strong>
    </button>
  );
};

export default FavoriteButton;
