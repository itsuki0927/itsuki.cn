import { Card } from '@/components/ui';
import { ao } from '@/constants/article/origin';
import { Article } from '@/entities/article';
import styles from './style.module.scss';

interface ArticleContentProps {
  article: Article;
}

const ArticleContent = ({ article }: ArticleContentProps) => {
  const origin = ao(article.origin);

  return (
    <Card
      title={
        <div className={styles.title}>
          <h1>{article.title}</h1>
          <span style={{ background: origin.color }} className={styles.origin}>
            {origin.icon}
            <span style={{ marginLeft: 8 }}>{origin.name}</span>
          </span>
        </div>
      }
      style={{ marginBottom: 24 }}
    >
      <div
        className='markdown-html'
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </Card>
  );
};

export default ArticleContent;
