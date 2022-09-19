import { Heart } from 'react-feather';
import classNames from 'classnames';
import toast from 'react-hot-toast';
import { CountDown } from '@/components/common';
import { GAEventCategories } from '@/constants/gtag';
import { ArticleDetailResponse } from '@/entities/article';
import { useLikeArticle } from '@/hooks/article';
import { gtag } from '@/utils/gtag';

interface FavoriteButtonProps {
  article: ArticleDetailResponse;
}

const FavoriteButton = ({ article }: FavoriteButtonProps) => {
  const { isLike, mutation } = useLikeArticle({
    articleId: article.id,
    articlePath: article.path,
  });

  const handleLike = () => {
    if (isLike) return;

    mutation.mutateAsync().then(() => {
      toast.success('感谢你对我的鼓励!!!');
      gtag.event('like_article', {
        category: GAEventCategories.Article,
        label: article.title,
      });
    });
  };

  return (
    <span className='flex flex-col justify-center'>
      <button
        aria-label='favorite article'
        type='button'
        className={classNames(
          'flex items-center justify-center rounded-sm bg-gray-25 px-2 py-2 text-sm font-medium text-gray-400 shadow-md outline-none',
          isLike
            ? 'cursor-not-allowed'
            : 'transition-colors duration-300 hover:bg-danger-hover'
        )}
        onClick={handleLike}
      >
        {isLike ? <Heart /> : <Heart />}
      </button>
      <strong className='capsize mt-1 text-center text-sm font-medium'>
        <CountDown num={article.liking} />
      </strong>
    </span>
  );
};

export default FavoriteButton;
