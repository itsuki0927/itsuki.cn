import { Container, MarkdownBlock } from '@/components/ui';
import { ArticleDetailResponse } from '@/entities/article';
import ArticleHeader from '../ArticleHeader';
import ArticleMeta from '../ArticleMeta';
import ArticleFooter from '../ArticleFooter';

interface ArticleContentProps {
  article: ArticleDetailResponse;
}

const ArticleContent = ({ article }: ArticleContentProps) => (
  <Container className='relative rounded-sm'>
    <ArticleHeader article={article} />

    <MarkdownBlock className='mb-5' htmlContent={article.content} />

    <ArticleMeta />

    <ArticleFooter article={article} />
  </Container>
);

export default ArticleContent;
