import classNames from 'classnames';
import { HeartFilled, HeartOutlined } from '@/components/icons';

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
        'float-right m-0 flex h-full min-w-[125px] items-center px-[10px] py-4 text-sm font-medium outline-none',
        isLike ? 'cursor-not-allowed' : ''
      )}
      disabled={isLike}
      onClick={handleLike}
    >
      {isLike ? <HeartFilled className='text-danger-hover' /> : <HeartOutlined />}
      <strong className='ml-2 mr-1 text-danger-hover'>{liking}</strong> 人喜欢
    </button>
  );
};

export default FavoriteButton;
