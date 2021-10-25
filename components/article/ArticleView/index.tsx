import { useState } from 'react';
import { patchArticleMeta } from '@/api/article';
import Comment from '@/components/comment';
import { ImagePopup } from '@/components/ui';
import { Article } from '@/entities/article';
import ArticleContent from '../ArticleContent';
import ArticleMeta from '../ArticleMeta';

interface ArticleViewProps {
  article: Article;
}

const ArticleView = ({ article }: ArticleViewProps) => {
  const [liking, setLiking] = useState(article.liking);

  return (
    <div>
      <ImagePopup
        ref={imagePopup => {
          (window as any).imagePopup = imagePopup;
        }}
      />

      <ArticleContent article={article} />

      <ArticleMeta article={article} />

      <Comment
        articleId={article.id}
        title={(comments, length) => <span>{length} 个想法</span>}
        liking={liking}
        onLikeArticle={articleId =>
          patchArticleMeta(articleId, { meta: 'liking' }).then(() => {
            setLiking(like => like + 1);
          })
        }
      />
    </div>
  );
};

export default ArticleView;
