import { useRef, useState } from 'react';
import { Heart } from 'react-feather';
import classNames from 'classnames';
import { ArticleDetailResponse } from '@/entities/article';
import { useLikeArticle } from '@/hooks/article';
import { LIKE_NUMBER_MAX } from '@/hooks/article/useLikeArticle';

interface FavoriteButtonProps {
  article: ArticleDetailResponse;
}

const FavoriteButton = ({ article }: FavoriteButtonProps) => {
  const { mutation, liking } = useLikeArticle({
    articleId: article.id,
    articlePath: article.path,
  });
  const [like, setLike] = useState(liking);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [display, setDisplay] = useState(false);

  const handleLike = () => {
    const allowLike = like < LIKE_NUMBER_MAX;
    if (!display) {
      setDisplay(true);
    }
    if (allowLike) {
      setLike(v => v + 1);
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    timerRef.current = setTimeout(() => {
      setDisplay(false);
      if (allowLike || like - liking) {
        mutation.mutate({ count: like - liking });
      }
    }, 500);
  };

  return (
    <div className='flex flex-col justify-center'>
      <button
        aria-label='favorite article'
        type='button'
        className={classNames(
          'flex items-center justify-center rounded-sm text-sm font-medium text-gray-400 outline-none transition-colors duration-300'
        )}
        onClick={handleLike}
      >
        <span>
          <Heart
            className={classNames(
              'scale-100 fill-danger stroke-transparent transition-transform duration-200 hover:scale-110'
            )}
          />
        </span>
      </button>
      <strong className='capsize mt-1 text-center text-xs font-medium text-gray-500'>
        {article.liking + like - liking}
      </strong>
      <span
        className={classNames(
          'absolute -left-12 top-3 rounded-full bg-gray-900 p-2 text-xs text-white transition-all',
          display ? 'translate-y-4 opacity-100' : 'translate-y-8 opacity-0'
        )}
      >
        +{Math.min(like, LIKE_NUMBER_MAX)}
      </span>
    </div>
  );
};

export default FavoriteButton;
