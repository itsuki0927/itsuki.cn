import { EyeOutlined, HeartOutlined, MessageOutlined } from '@ant-design/icons';
import Image from 'next/image';
import router from 'next/router';
import imageTransformer from '@/transformers/image';
import { Article } from '@/entities/article';
import Card from '../Card';
import styles from './style.module.scss';

type ArticleCardProps = {
  article: Article;
};

const ArticleCard = ({ article }: ArticleCardProps) => (
  <Card
    hoverable
    onClick={() => router.push(`/article/${article.id}`)}
    className={styles.article}
    cover={
      <Image
        alt='article-cover'
        width={300}
        height={312}
        objectFit='cover'
        src={article.cover}
        className={styles.cover}
        loader={imageTransformer}
      />
    }
    actions={[
      <span key='reading'>
        <EyeOutlined className={styles.action} />
        {article.reading}
      </span>,
      <span key='commenting'>
        <MessageOutlined className={styles.action} />
        {article.commenting}
      </span>,
      <span key='liking'>
        <HeartOutlined className={styles.action} />
        {article.liking}
      </span>,
    ]}
  >
    <Card.Meta title={article.title} description={article.description} />
  </Card>
);

export default ArticleCard;
