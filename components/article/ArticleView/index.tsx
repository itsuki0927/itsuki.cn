import { ArticleJsonLd, NextSeo } from 'next-seo';
import Image from 'next/image';
import { CommentView } from '@/components/comment';
import { ToDate } from '@/components/common';
import { ImagePopup } from '@/components/ui';
import Widget from '@/components/ui/Widget';
import { ArticleDetailResponse } from '@/entities/article';
import { useGlobalData } from '@/hooks/globalData';
import { CustomWindow } from '@/types/window';
import { getArticleDetailFullUrl } from '@/utils/url';
import ArticleContent from '../ArticleContent';
import ArticlePagination from '../ArticlePagination';

declare let window: CustomWindow;

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

      <Widget>
        <Widget.Header> 看看这些? </Widget.Header>
        <div className='mb-2 flex justify-between'>
          {globalData.data?.hotArticles.slice(0, 3).map(item => (
            <div key={item.id}>
              <Image src={item.cover} width={210} height={158} />
              <h2 className='cursor-pointer text-sm tracking-widest text-[#2d2d2d] transition-colors duration-500 hover:text-[#777]'>
                {item.title}
              </h2>
              <span className='mb-1 text-xs tracking-wider text-[#b6b6b6]'>
                <ToDate date={item.createAt} to='YMD' />
              </span>
            </div>
          ))}
        </div>
      </Widget>

      <ArticlePagination
        prevArticle={article.prevArticle}
        nextArticle={article.nextArticle}
      />

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
};

export default ArticleView;
