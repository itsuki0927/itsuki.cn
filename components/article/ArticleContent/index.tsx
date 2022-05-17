import { Container, MarkdownBlock } from '@/components/ui';
import { ArticleDetailResponse } from '@/entities/article';
import ArticleAction from '../ArticleAction';
import ArticleFooter from '../ArticleFooter';
import ArticleHeader from '../ArticleHeader';
import ArticleMeta from '../ArticleMeta';

interface ArticleContentProps {
  article: ArticleDetailResponse;
}

const ArticleContent = ({ article }: ArticleContentProps) => (
  <Container className='relative rounded-sm pb-16'>
    <ArticleHeader article={article} />

    <MarkdownBlock className='mb-5' htmlContent={article.content} />

    <ArticleAction article={article} />

    <ArticleMeta />

    <ArticleFooter />
  </Container>
);

export default ArticleContent;
