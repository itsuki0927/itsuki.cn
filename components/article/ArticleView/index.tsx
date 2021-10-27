import { CommentView } from '@/components/comment';
import { ImagePopup } from '@/components/ui';
import { Article } from '@/entities/article';
import ArticleContent from '../ArticleContent';
import ArticleMeta from '../ArticleMeta';

interface ArticleViewProps {
  article: Article;
}

const ArticleView = ({ article }: ArticleViewProps) => (
  <div>
    <ImagePopup
      ref={imagePopup => {
        (window as any).imagePopup = imagePopup;
      }}
    />

    <ArticleContent article={article} />

    <ArticleMeta article={article} />

    <CommentView
      articleId={article.id}
      title={(comments, length) => <span>{length} 个想法</span>}
      liking={article.liking}
    />
  </div>
);

export default ArticleView;
