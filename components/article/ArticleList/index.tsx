import React from 'react';
import { Empty, Loading } from '@/components/ui';
import { Article } from '@/entities/article';
import { SearchResponse } from '@/entities/response/base';
import ArticleCard from '../ArticleCard';
import styles from './style.module.scss';

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
