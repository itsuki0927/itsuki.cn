import React from 'react';
import { Article } from '@/entities/article';
import { SearchResponse } from '@/entities/response/base';
import Empty from '../Empty';
import Loading from '../Loading';
import ArticleCard from './Card';
import styles from './style.module.scss';

export { ArticleCard };

type ArticleListProps = {
  articles?: SearchResponse<Article>;
};

const ArticleList = ({ articles }: ArticleListProps) => {
  if (!articles) return <Loading />;

  if (articles.total === 0) {
    return <Empty />;
  }

  return (
    <div className={styles.list}>
      {articles.data.map(article => (
        <ArticleCard article={article} key={article.id} />
      ))}
    </div>
  );
};
export default ArticleList;
