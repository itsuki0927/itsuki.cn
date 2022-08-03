import { Share } from '@/components/common';
import { GAEventCategories } from '@/constants/gtag';
import { ArticleDetailResponse } from '@/entities/article';
import { gtag } from '@/utils/gtag';
import SponsorButton from '../SponsorButton';
import { ARTICLE_ACTIONS_ELEMENT_ID } from '@/constants/anchor';
import FavoriteButton from '../FavoriteButton';

interface ArticleActionProps {
  article: ArticleDetailResponse;
  openPopup: () => void;
}

const ArticleAction = ({ article, openPopup }: ArticleActionProps) => (
  <div
    id={ARTICLE_ACTIONS_ELEMENT_ID}
    className='sticky top-16 flex scroll-m-20 flex-col items-center justify-center space-y-4 opacity-80 transition-opacity duration-300 hover:opacity-100'
  >
    <SponsorButton
      onClick={() => {
        gtag.event('sponsor_article', {
          category: GAEventCategories.Widget,
        });
        openPopup();
      }}
    />
    <Share />
    <FavoriteButton article={article} />
  </div>
);

export default ArticleAction;
