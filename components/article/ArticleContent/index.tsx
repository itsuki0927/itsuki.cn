import { Container, MarkdownBlock } from '@/components/ui';
import { useUI } from '@/components/ui/context';
import { ArticleDetailResponse } from '@/entities/article';
import ArticleAction from '../ArticleAction';
import ArticleMeta from '../ArticleMeta';

interface ArticleContentProps {
  article: ArticleDetailResponse;
}

const ArticleContent = ({ article }: ArticleContentProps) => {
  const { openPopup, setPopupView } = useUI();

  return (
    <Container className='relative rounded-sm'>
      <MarkdownBlock className='my-5' htmlContent={article.htmlContent} />

      <ArticleMeta />

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
