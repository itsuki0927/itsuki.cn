import styles from './style.module.scss';
import { EyeFilled, HeartFilled, MessageFilled } from '@/components/icons';
import { Article } from '@/entities/article';

const articleCountList = [
  { key: 'liking', text: '个喜欢', icon: <HeartFilled className={styles.icon} /> },
  { key: 'commenting', text: '条评论', icon: <MessageFilled className={styles.icon} /> },
  { key: 'reading', text: '人浏览', icon: <EyeFilled className={styles.icon} /> },
] as const;

interface ArticleCounterProps {
  article: Article;
}

const ArticleCounter = ({ article }: ArticleCounterProps) => (
  <div className={styles.count}>
    {articleCountList.map(item => (
      <div key={item.key} className={`${styles.item} ${styles[item.key]}`}>
        {item.icon}
        <span className={styles.name}>
          <strong>{article[item.key]}</strong>
          {item.text}
        </span>
      </div>
    ))}
  </div>
);

export default ArticleCounter;
