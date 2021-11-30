import { useRouter } from 'next/router';
import { Button, Card } from '@/components/ui';
import { WEB_URL } from '@/configs/app';
import { Article } from '@/entities/article';
import { ArticleTag } from '..';
import styles from './style.module.scss';

interface ArticleMetaProps {
  article: Article;
}

const ArticleMeta = ({ article }: ArticleMetaProps) => {
  const router = useRouter();
  return (
    <Card className={styles.metas}>
      <div className={styles.meta}>
        <span className={styles.date}>
          本文于 {new Date(article.createAt).toLocaleDateString()} 发布
          <span className={styles.separator}>|</span>
          更新于 {new Date(article.updateAt).toLocaleDateString()}
          <span className={styles.separator}>|</span>
          被围观 {article.reading} 次
        </span>
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
          <ArticleTag key={item.id} tag={item} />
        ))}
      </div>

      <div className={styles.meta}>
        <span className={styles.label}>永久地址 : </span>
        <span className={styles.url}>{WEB_URL + router.asPath}</span>
      </div>

      <div className={styles.meta}>
        <span className={styles.label}>版权声明 : </span>
        <a
          className={styles.copyright}
          href='https://creativecommons.org/licenses/by-nc/3.0/cn/deed.zh'
          target='_blank'
          rel='external nofollow noopener noreferrer'
        >
          自由转载 - 署名 - 非商业使用
        </a>
      </div>
    </Card>
  );
};

export default ArticleMeta;
