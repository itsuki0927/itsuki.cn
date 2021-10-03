import Button from '@/components/Button';
import Card from '@/components/Card';
import Comment from '@/components/Comment';
import { Article } from '@/entities/article';
import marked from '@/utils/marked';
import { AndroidOutlined } from '@ant-design/icons';
import { getArticleById } from 'api/article';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  return (
    <div>
      <Card
        title={<h1 className={styles.title}>{article.title}</h1>}
        extra={<span>测试</span>}
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
            <Button type='link' key={item.id} size='small'>
              {item.name}
            </Button>
          ))}
        </div>

        <div className={styles.meta}>
          <span className={styles.label}>相关标签 : </span>
          {article.tags.map(item => (
            <Button key={item.id} size='small' icon={<AndroidOutlined />}>
              {item.name}
            </Button>
          ))}
        </div>

        <div className={styles.meta}>
          <span className={styles.label}>永久地址 : </span>
          <a href={router.asPath}>{router.asPath}</a>
        </div>
      </Card>

      <Comment title='评论' />
    </div>
  );
};

export default ArticlePage;
