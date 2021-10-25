import { useRouter } from 'next/router';
import { Button, Card, Tag } from '@/components/ui';
import { Article } from '@/entities/article';
import styles from './style.module.scss';

interface ArticleMetaProps {
  article: Article;
}

const ArticleMeta = ({ article }: ArticleMetaProps) => {
  const router = useRouter();
  return (
    <Card className={styles.metas} title='相关信息'>
      <div className={styles.meta}>
        <span className={styles.label}>发布时间 : </span>
        本文发表于 {new Date(article.createAt).toLocaleDateString()} &nbsp; 最后更新于{' '}
        {new Date(article.updateAt).toLocaleDateString()}
      </div>

      <div className={styles.meta}>
        <span className={styles.label}>相关分类 : </span>
        {article.categories.map(item => (
          <Button
            type='link'
            key={item.id}
            size='small'
            onClick={() => router.push(`/category/${item.path}`)}
          >
            {item.name}
          </Button>
        ))}
      </div>

      <div className={styles.meta}>
        <span className={styles.label}>相关标签 : </span>
        {article.tags.map(item => (
          <Tag key={item.id} tag={item} />
        ))}
      </div>

      <div className={styles.meta}>
        <span className={styles.label}>永久地址 : </span>
        <a href={router.asPath}>{router.asPath}</a>
      </div>
    </Card>
  );
};

export default ArticleMeta;
