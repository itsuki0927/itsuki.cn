import toast from 'react-hot-toast';
import { Share } from '@/components/common';
import { GAEventCategories } from '@/constants/gtag';
import { ArticleDetailResponse } from '@/entities/article';
import { useLikeArticle } from '@/hooks/article';
import { gtag } from '@/utils/gtag';
import FavoriteButton from '../FavoriteButton';
import SponsorButton from '../SponsorButton';

interface ArticleActionProps {
  article: ArticleDetailResponse;
  openPopup: () => void;
}

const ArticleAction = ({ article, openPopup }: ArticleActionProps) => {
  const { isLike, mutation } = useLikeArticle(article.id);
  return (
    <div className='mx-auto flex items-center justify-center space-x-4'>
      <FavoriteButton
        isLike={isLike}
        onLike={() => {
          mutation.mutateAsync().then(() => {
            toast.success('感谢你对我的鼓励!!!');
            gtag.event('like_article', {
              category: GAEventCategories.Article,
              label: article.title,
            });
          });
        }}
        liking={article.liking}
      />
      <SponsorButton
        onClick={() => {
          gtag.event('sponsor_article', {
            category: GAEventCategories.Widget,
          });
          openPopup();
        }}
      />
      <Share />
    </div>
  );
};

export default ArticleAction;
