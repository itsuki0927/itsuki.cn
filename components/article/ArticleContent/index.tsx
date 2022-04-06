import { MarkdownBlock } from '@/components/ui';
import { ArticleDetailResponse } from '@/entities/article';
import ArticleHeader from '../ArticleHeader';
import ArticleMeta from '../ArticleMeta';
import ArticleFooter from '../ArticleFooter';

interface ArticleContentProps {
  article: ArticleDetailResponse;
}

const ArticleContent = ({ article }: ArticleContentProps) => (
  <div className='relative rounded-sm bg-white p-4'>
    <ArticleHeader article={article} />

    <MarkdownBlock className='mb-5' htmlContent={article.content} />

    <ArticleMeta article={article} />

    <ArticleFooter article={article} />
  </div>
);

export default ArticleContent;
