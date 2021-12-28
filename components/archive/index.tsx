import classNames from 'classnames';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { ArticleArchiveMap, ArticleArchiveResponse } from '@/entities/article';
import styles from './style.module.scss';

const getDay = (dateString: string) => `${dateString.slice(-2)}号`;

const ArticleList = ({ articles }: ArticleArchiveMap) => (
  <ul className={styles.articleList}>
    {articles.map(article => (
      <li className={styles.article} key={article.id}>
        <p className={styles.title}>
          <span className={styles.date}>{getDay(article.createAtString)}</span>
          <Link href={`/article/${article.id}`}>
            <span className={styles.link}>{article.title}</span>
          </Link>
        </p>
        <p className={styles.description}>{article.description}</p>
      </li>
    ))}
  </ul>
);

const MonthList = ({ months }: { months: ArticleArchiveMap }) => (
  <>
    {Object.entries(months).map(([month, articles]) => (
      <ul className={styles.monthList} key={month}>
        <li key={month} className={styles.month}>
          <h3 className={`${styles.title} ${styles.month}`}>{month}</h3>
          <ArticleList articles={articles} />
        </li>
      </ul>
    ))}
  </>
);

interface ArchivePageProps {
  archives: ArticleArchiveResponse;
}

const ArchiveView = ({ archives }: ArchivePageProps) => (
  <div className={styles.archive}>
    <NextSeo title='归档' />
    <ul className={styles.yearList}>
      {Object.entries(archives)
        .reverse()
        .map(([year, months]) => (
          <li key={year} className={styles.year}>
            <h2 className={classNames(styles.title, styles.root)}>
              <span>{year}</span>
            </h2>
            <MonthList months={months} />
          </li>
        ))}
    </ul>
  </div>
);

export default ArchiveView;
