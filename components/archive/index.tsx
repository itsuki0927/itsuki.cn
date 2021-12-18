import classNames from 'classnames';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { ArticleArchiveMap, ArticleArchiveResponse } from '@/entities/article';
import { Card } from '../ui';
import styles from './style.module.scss';

const ArticleList = ({ articles }: ArticleArchiveMap) => (
  <ul className={styles.articleList}>
    {articles.map(article => (
      <li className={styles.article}>
        <p className={styles.title}>
          <span className={styles.date}>{`${Number(
            article.createAtString.slice(-2)
          )} 号`}</span>
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
      <ul className={styles.monthList}>
        <li key={month} className={styles.month}>
          <h5 className={styles.title}>{month}</h5>
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
  <Card className={styles.archive}>
    <NextSeo title='归档' />
    <ul className={styles.yearList}>
      {Object.entries(archives).map(([year, months]) => (
        <li key={year} className={styles.year}>
          <h4 className={classNames(styles.title, styles.root)} style={{ marginTop: 0 }}>
            <span>{year}</span>
          </h4>
          <MonthList months={months} />
        </li>
      ))}
    </ul>
  </Card>
);

export default ArchiveView;
