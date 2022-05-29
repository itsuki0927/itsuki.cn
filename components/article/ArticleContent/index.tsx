import { useEffect } from 'react';
import { Container, MarkdownBlock } from '@/components/ui';
import { useUI } from '@/components/ui/context';
import { ArticleDetailResponse } from '@/entities/article';
import { off, on } from '@/utils/events';
import ArticleAction from '../ArticleAction';
import ArticleHeader from '../ArticleHeader';
import ArticleMeta from '../ArticleMeta';

interface ArticleContentProps {
  article: ArticleDetailResponse;
}

const ArticleContent = ({ article }: ArticleContentProps) => {
  const { openPopup, setPopupView } = useUI();

  useEffect(() => {
    const imgs = [...document.querySelectorAll('[name^=article-cover]')];
    const handleImageClick = (e: any) => {
      const { src } = e.target;
      openPopup({ src });
    };
    imgs.forEach(img => {
      on(img, 'click', handleImageClick);
    });
    return () => {
      imgs.forEach(img => {
        off(img, 'click', handleImageClick);
      });
    };
  }, [openPopup]);

  return (
    <Container className='relative rounded-sm'>
      <ArticleHeader article={article} openPopup={openPopup} />

      <MarkdownBlock className='my-5' htmlContent={article.content} />

      <ArticleMeta />

      <div className='my-4 border-t border-dashed border-gray-2' />

      <ArticleAction
        article={article}
        openPopup={() => {
          setPopupView('SPONSOR_VIEW');
          openPopup();
        }}
      />
    </Container>
  );
};

export default ArticleContent;
