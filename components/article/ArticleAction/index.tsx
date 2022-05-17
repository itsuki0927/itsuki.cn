import { ArticleDetailResponse } from '@/entities/article';
import { useLikeArticle } from '@/hooks/article';
import FavoriteButton from '../FavoriteButton';

interface ArticleActionProps {
  article: ArticleDetailResponse;
}

const ArticleAction = ({ article }: ArticleActionProps) => {
  const { isLike, mutation } = useLikeArticle(article.id);
  return (
    <div className='mx-auto my-4 flex w-52 justify-center'>
      <FavoriteButton
        isLike={isLike}
        onLike={() => {
          mutation.mutateAsync();
        }}
        liking={article.liking}
      />
    </div>
  );
};

export default ArticleAction;
