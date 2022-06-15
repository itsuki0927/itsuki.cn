import classNames from 'classnames';
import toast from 'react-hot-toast';
import { LikeFilled, LikeOutlined } from '@/components/icons';
import { GAEventCategories } from '@/constants/gtag';
import { ArticleDetailResponse } from '@/entities/article';
import { useLikeArticle } from '@/hooks/article';
import { gtag } from '@/utils/gtag';

interface FavoriteButtonProps {
  article: ArticleDetailResponse;
}

const FavoriteButton = ({ article }: FavoriteButtonProps) => {
  const { isLike, mutation } = useLikeArticle(article.id);

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
      <strong className='capsize font-medium'>{article.liking}</strong>
    </button>
  );
};

export default FavoriteButton;
