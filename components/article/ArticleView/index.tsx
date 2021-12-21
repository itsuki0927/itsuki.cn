import { BlogJsonLd, NextSeo } from 'next-seo';
import { CommentView } from '@/components/comment';
import { ImagePopup } from '@/components/ui';
import { Article } from '@/entities/article';
import { getArticleDetailFullUrl } from '@/utils/url';
import ArticleContent from '../ArticleContent';
import ArticleCounter from '../ArticleCounter';
import ArticleMeta from '../ArticleMeta';

interface ArticleViewProps {
  article: Article;
}

const ArticleView = ({ article }: ArticleViewProps) => (
  <div>
    <NextSeo
      title={article.title}
      description={article.description}
      additionalMetaTags={[{ name: 'keywords', content: article.keywords }]}
    />
    <BlogJsonLd
      url={getArticleDetailFullUrl(article.id)}
      title={article.title}
      images={[article.cover]}
      datePublished={article.createAt.toString()}
      dateModified={article.updateAt.toString()}
      authorName={article.author}
      description={article.description}
    />

    <ImagePopup
      ref={imagePopup => {
        if (!(window as any).imagePopup) {
          (window as any).imagePopup = imagePopup;
        }
      }}
    />

    <ArticleContent article={article} />

    <ArticleMeta article={article} />

    <ArticleCounter article={article} />

    <CommentView articleId={article.id} />
  </div>
);

export default ArticleView;
