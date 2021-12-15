import React from 'react';
import { Empty, Loading } from '@/components/ui';
import { Article } from '@/entities/article';
import { SearchResponse } from '@/entities/response/base';
import ArticleCard from '../ArticleCard';

type ArticleListProps = {
  articles?: SearchResponse<Article>;
};

const ArticleList = ({ articles }: ArticleListProps) => {
  if (!articles) return <Loading />;

  if (articles.total === 0) {
    return <Empty />;
  }

  return (
    <>
      {articles.data.map(article => (
        <ArticleCard article={article} key={article.id} />
      ))}
    </>
  );
};
export default ArticleList;
