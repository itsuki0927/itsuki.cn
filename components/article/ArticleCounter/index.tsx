import classNames from 'classnames';
import { useState } from 'react';
import styles from './style.module.scss';
import { EyeFilled, HeartFilled, HeartOutlined, MessageFilled } from '@/components/icons';
import { Article } from '@/entities/article';
import useInLikeArticles from '@/framework/local/article/use-in-like-articles';
import useLikeArticle from '@/framework/local/article/use-like-article';

interface ArticleCounterProps {
  article: Article;
}

const ArticleCounter = ({ article }: ArticleCounterProps) => {
  const isLike = useInLikeArticles(article.id);
  const likeArticle = useLikeArticle();
  const [liking, setLiking] = useState(article.liking);

  return (
    <div className={styles.count}>
      <div key='reading' className={`${styles.item} ${styles.reading}`}>
        <EyeFilled className={styles.icon} />
        <span className={styles.name}>
          <strong className={styles.text}>{article.reading}</strong>
          人阅读
        </span>
      </div>
      <div key='commenting' className={`${styles.item} ${styles.commenting}`}>
        <MessageFilled className={styles.icon} />
        <span className={styles.name}>
          <strong className={styles.text}>{article.commenting}</strong>
          条评论
        </span>
      </div>
      <div
        tabIndex={0}
        role='button'
        key='liking'
        className={classNames(styles.item, styles.liking, {
          [styles.liked]: isLike,
        })}
        onClick={() => {
          if (isLike) return;
          setLiking(l => l + 1);
          likeArticle({ articleId: article.id });
        }}
      >
        {isLike ? (
          <HeartFilled className={styles.icon} />
        ) : (
          <HeartOutlined className={styles.icon} />
        )}
        <span className={styles.name}>
          <strong className={styles.text}>{liking}</strong>
          个喜欢
        </span>
      </div>
    </div>
  );
};

export default ArticleCounter;
