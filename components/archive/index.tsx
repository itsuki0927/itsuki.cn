import classNames from 'classnames';
import Link from 'next/link';
import {
  ArticleArchive,
  ArticleArchiveResponse,
  BlogCardStyle,
} from '@/entities/article';
import styles from './index.module.scss';
import { getBlogDetailRoute } from '@/utils/url';

interface ArchivePageProps {
  archives?: ArticleArchiveResponse;
}

interface ArchiveCardProps {
  article: ArticleArchive;
  index: number;
}

const ArchiveCard = ({ article, index }: ArchiveCardProps) => {
  const hasCover = article.cardStyle !== BlogCardStyle.Image;
  return (
    <div
      className={classNames(styles.card, hasCover && styles.hasCover)}
      style={{
        backgroundImage: `url(${hasCover ? article.cover : ''})`,
      }}
    >
      <div className={classNames(styles.inner)}>
        <div className={styles.singleNum}>
          <i>#</i>
          {index}
        </div>
        <Link href={getBlogDetailRoute(article.path)}>
          <span className={classNames(styles.link)}>{article.title}</span>
        </Link>
      </div>
    </div>
  );
};

const ArchiveView = ({ archives = new Map() }: ArchivePageProps) => (
  <ul className='container space-y-12 py-8 md:py-16'>
    {[...archives.entries()].map(([year, articles]) => (
      <li key={year} className='flex flex-col rounded-sm md:flex-row md:items-start'>
        <h3 className={classNames(styles.year)}>
          {year}
          <span className={classNames(styles.count)}>{articles.length} 篇文章</span>
        </h3>

        <div className='flex flex-grow flex-wrap'>
          {articles.map((article, index) => (
            <ArchiveCard article={article} index={index + 1} />
          ))}
        </div>
      </li>
    ))}
  </ul>
);

export default ArchiveView;
