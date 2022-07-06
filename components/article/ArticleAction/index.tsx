import dynamic from 'next/dynamic';
import { Share } from '@/components/common';
import { GAEventCategories } from '@/constants/gtag';
import { ArticleDetailResponse } from '@/entities/article';
import { gtag } from '@/utils/gtag';
import SponsorButton from '../SponsorButton';
import { ARTICLE_ACTIONS_ELEMENT_ID } from '@/constants/anchor';

const DynamicFavoriteButton = dynamic(() => import('../FavoriteButton'), {
  ssr: false,
});

interface ArticleActionProps {
  article: ArticleDetailResponse;
  openPopup: () => void;
}

const ArticleAction = ({ article, openPopup }: ArticleActionProps) => (
  <div
    id={ARTICLE_ACTIONS_ELEMENT_ID}
    className='mx-auto flex scroll-m-20 items-center justify-center space-x-4'
  >
    <DynamicFavoriteButton article={article} />
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

export default ArticleAction;
