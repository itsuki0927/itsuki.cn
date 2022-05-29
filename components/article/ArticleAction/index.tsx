import { Share } from '@/components/common';
import { ArticleDetailResponse } from '@/entities/article';
import { useLikeArticle } from '@/hooks/article';
import FavoriteButton from '../FavoriteButton';
import SponsorButton from '../SponsorButton';

interface ArticleActionProps {
  article: ArticleDetailResponse;
  openPopup: () => void;
}

const ArticleAction = ({ article, openPopup }: ArticleActionProps) => {
  const { isLike, mutation } = useLikeArticle(article.id);
  return (
    <div className='mx-auto flex w-52 justify-center space-x-4'>
      <FavoriteButton
        isLike={isLike}
        onLike={() => {
          mutation.mutateAsync();
        }}
        liking={article.liking}
      />

      <SponsorButton onClick={openPopup} />

      <Share />
    </div>
  );
};

export default ArticleAction;
