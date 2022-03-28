import { ArticleJsonLd, NextSeo } from 'next-seo';
import { CommentView } from '@/components/comment';
import { ImagePopup } from '@/components/ui';
import { Article } from '@/entities/article';
import { CustomWindow } from '@/types/window';
import { getArticleDetailFullUrl } from '@/utils/url';
import ArticleContent from '../ArticleContent';
import ArticleCounter from '../ArticleCounter';
import ArticleMeta from '../ArticleMeta';

declare let window: CustomWindow;

interface ArticleViewProps {
  article: Article;
}

const ArticleView = ({ article }: ArticleViewProps) => (
  <div className='space-y-6'>
    <NextSeo
      title={article.title}
      description={article.description}
      additionalMetaTags={[{ name: 'keywords', content: article.keywords }]}
    />
    <ArticleJsonLd
      url={getArticleDetailFullUrl(article.id)}
      title={article.title}
      images={[article.cover]}
      datePublished={article.createAt.toString()}
      dateModified={article.updateAt.toString()}
      authorName={article.author}
      description={article.description}
    />

    <ArticleContent article={article} />

    <ArticleMeta article={article} />

    <ArticleCounter article={article} />

    <CommentView articleId={article.id} />

    <ImagePopup
      ref={imagePopup => {
        if (!window.imagePopup) {
          window.imagePopup = imagePopup;
        }
      }}
    />
  </div>
);

export default ArticleView;
