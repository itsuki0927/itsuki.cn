import { MarkdownBlock } from '@/components/ui';
import { ao } from '@/constants/article/origin';
import { Article } from '@/entities/article';
import styles from './style.module.scss';

interface ArticleContentProps {
  article: Article;
}

const ArticleContent = ({ article }: ArticleContentProps) => {
  const origin = ao(article.origin);

  return (
    <div className={styles.content}>
      <div className={styles.title}>
        <h2>{article.title}</h2>
        <span style={{ background: origin.color }} className={styles.origin}>
          {origin.icon}
          <span className={styles.text}>{origin.name}</span>
        </span>
      </div>

      <MarkdownBlock htmlContent={article.content} />
    </div>
  );
};

export default ArticleContent;
