import { MarkdownBlock } from '@/components/ui';
import { ao } from '@/constants/article/origin';
import { Article } from '@/entities/article';

interface ArticleContentProps {
  article: Article;
}

const ArticleContent = ({ article }: ArticleContentProps) => {
  const origin = ao(article.origin);

  return (
    <div className='p-4 rounded-sm bg-white'>
      <div className='text-center'>
        <h2>{article.title}</h2>
        <span
          style={{ background: origin.color }}
          className='absolute left-0 top-0 rounded-sm text-sm text-white py-1 px-4 opacity-70'
        >
          {origin.icon}
          <span className='ml-1'>{origin.name}</span>
        </span>
      </div>

      <MarkdownBlock htmlContent={article.content} />
    </div>
  );
};

export default ArticleContent;
