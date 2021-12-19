import { BlogJsonLd, NextSeo } from 'next-seo';
import { CommentView } from '@/components/comment';
import { EyeFilled, HeartFilled, MessageFilled } from '@/components/icons';
import { ImagePopup } from '@/components/ui';
import { Article } from '@/entities/article';
import { getArticleDetailUrl } from '@/utils/url';
import ArticleContent from '../ArticleContent';
import ArticleMeta from '../ArticleMeta';
import styles from './style.module.scss';

interface ArticleViewProps {
  article: Article;
}

const articleCountList = [
  { key: 'liking', text: '个喜欢', icon: <HeartFilled className={styles.icon} /> },
  { key: 'commenting', text: '条评论', icon: <MessageFilled className={styles.icon} /> },
  { key: 'reading', text: '人浏览', icon: <EyeFilled className={styles.icon} /> },
] as const;

const ArticleView = ({ article }: ArticleViewProps) => (
  <div>
    <NextSeo
      title={article.title}
      description={article.description}
      additionalMetaTags={[{ name: 'keywords', content: article.keywords }]}
    />
    <BlogJsonLd
      url={getArticleDetailUrl(article.id)}
      title={article.title}
      images={[article.cover]}
      datePublished={article.createAt.toString()}
      dateModified={article.updateAt.toString()}
      authorName={article.author}
      description={article.description}
    />

    <ImagePopup
      ref={imagePopup => {
        if (!(window as any).imagePopup) {
          (window as any).imagePopup = imagePopup;
        }
      }}
    />

    <ArticleContent article={article} />

    <ArticleMeta article={article} />

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

    <CommentView articleId={article.id} />
  </div>
);

export default ArticleView;
