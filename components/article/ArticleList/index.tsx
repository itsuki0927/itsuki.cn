import React from 'react';
import { Empty, Loading } from '@/components/ui';
import { Article } from '@/entities/article';
import { SearchResponse } from '@/types/response';
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
    <div className='space-y-4'>
      {articles.data.map(article => (
        <ArticleCard article={article} key={article.id} />
      ))}
    </div>
  );
};
export default ArticleList;
