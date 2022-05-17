import { ArticleJsonLd, NextSeo } from 'next-seo';
import { CommentView } from '@/components/comment';
import { ArticleDetailResponse } from '@/entities/article';
import { useGlobalData } from '@/hooks/globalData';
import { getArticleDetailFullUrl } from '@/utils/url';
import ArticleContent from '../ArticleContent';
import ArticlePagination from '../ArticlePagination';
import RelateArticles from '../RelateArticles';

interface ArticleViewProps {
  article: ArticleDetailResponse;
}

const ArticleView = ({ article }: ArticleViewProps) => {
  const globalData = useGlobalData();

  return (
    <div className='space-y-6'>
      <NextSeo
        title={article.title}
        description={article.description}
        additionalMetaTags={[
          { name: 'keywords', content: article.keywords },
          {
            name: 'cover',
            content: article.cover,
          },
        ]}
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

      <RelateArticles relateArticles={globalData?.data?.hotArticles.slice(0, 3) ?? []} />

      <ArticlePagination
        prevArticle={article.prevArticle}
        nextArticle={article.nextArticle}
      />

      <CommentView articleId={article.id} />
    </div>
  );
};

export default ArticleView;
