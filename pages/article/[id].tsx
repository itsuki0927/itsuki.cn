import BackTop from '@/components/BackTop';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Comment from '@/components/Comment';
import Tag from '@/components/Tag';
import { ao } from '@/constants/article/origin';
import { Article } from '@/entities/article';
import useMount from '@/hooks/useMount';
import marked from '@/utils/marked';
import { getArticleById, patchArticleMeta } from 'api/article';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './style.module.scss';

type StaticProps = {
  article: Article;
};

export const getServerSideProps: GetServerSideProps<StaticProps> = async ({ params }) => {
  const article = await getArticleById(params?.id as string);

  return {
    props: {
      article,
    },
  };
};

const ArticlePage = ({ article }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [liking, setLiking] = useState(article.liking);

  useMount(() => {
    patchArticleMeta(article.id, { meta: 'reading' });
  });

  const router = useRouter();
  const origin = ao(article.origin);

  return (
    <div>
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
          dangerouslySetInnerHTML={{ __html: marked(article.content) }}
        />
      </Card>

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

      <Comment
        articleId={article.id}
        title={(comments, length) => <span>{length} 个想法</span>}
        liking={liking}
        onLikeArticle={articleId => {
          return patchArticleMeta(articleId, { meta: 'liking' }).then(() => {
            setLiking(like => like + 1);
          });
        }}
      />

      <BackTop />
    </div>
  );
};

export default ArticlePage;
