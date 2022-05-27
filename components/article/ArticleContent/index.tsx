import { useEffect } from 'react';
import { Container, MarkdownBlock } from '@/components/ui';
import { useUI } from '@/components/ui/context';
import { ArticleDetailResponse } from '@/entities/article';
import { off, on } from '@/utils/events';
import ArticleAction from '../ArticleAction';
import ArticleFooter from '../ArticleFooter';
import ArticleHeader from '../ArticleHeader';
import ArticleMeta from '../ArticleMeta';
import { Share } from '@/components/common';

interface ArticleContentProps {
  article: ArticleDetailResponse;
}

const ArticleContent = ({ article }: ArticleContentProps) => {
  const { openPopup } = useUI();

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
    <Container className='relative rounded-sm pb-16'>
      <ArticleHeader article={article} openPopup={openPopup} />

      <MarkdownBlock className='my-5' htmlContent={article.content} />

      <ArticleAction article={article} />

      <ArticleMeta />

      <ArticleFooter />

      <Share />
    </Container>
  );
};

export default ArticleContent;
