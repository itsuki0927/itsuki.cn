import Image from 'next/image';
import router from 'next/router';
import {
  EyeOutlined,
  HeartOutlined,
  MessageOutlined,
  TimeOutlined,
} from '@/components/icons';
import { Card } from '@/components/ui';
import { Article } from '@/entities/article';
import { imageTransformer } from '@/transformers/index';
import styles from './style.module.scss';
import { getDateString } from '@/transformers/date';

type ArticleCardProps = {
  article: Article;
};

const ArticleCard = ({ article }: ArticleCardProps) => (
  <Card
    hoverable
    onClick={() => router.push(`/article/${article.id}`)}
    className={styles.article}
  >
    <div className={styles.wrapper}>
      <Image
        alt='article-cover'
        width={180}
        height={135}
        objectFit='cover'
        src={article.cover}
        className={styles.cover}
        loader={imageTransformer}
      />

      <div className={styles.content}>
        <div>
          <p className={styles.title}>{article.title}</p>
          <p className={styles.description}>{article.description}</p>
        </div>

        <div className={styles.actions}>
          <span key='time'>
            <TimeOutlined className={styles.icon} />
            {getDateString(article.createAt)}
          </span>
          <span key='reading'>
            <EyeOutlined className={styles.icon} />
            {article.reading}
          </span>
          <span key='commenting'>
            <MessageOutlined className={styles.icon} />
            {article.commenting}
          </span>
          <span key='liking'>
            <HeartOutlined className={styles.icon} />
            {article.liking}
          </span>
        </div>
      </div>
    </div>
  </Card>
);

export default ArticleCard;
