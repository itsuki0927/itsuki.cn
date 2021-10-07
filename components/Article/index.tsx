import { getArticles } from '@/api/article';
import Card from '@/components/Card';
import { Article } from '@/entities/article';
import { ArticleSearchRequest } from '@/entities/request/article';
import { SearchResponse } from '@/entities/response/base';
import React, { useEffect, useState } from 'react';
import { pickPaginationPropsFromQuery } from '../Pagination/util';
import ArticleCard from './Card';
import ArticleListWrapper from './List';

export { ArticleCard };

type ArticleWrapperProps = {
  query?: ArticleSearchRequest;
  pagination?: false;
};

const ArticleList = ({ query, pagination }: ArticleWrapperProps) => {
  const [articles, setArticles] = useState<SearchResponse<Article>>();

  const fetchArticles = async (params?: ArticleSearchRequest) => {
    const articles = await getArticles(params);
    console.log('articles:', articles);
    setArticles(articles);
  };

  const handleChange = (current: number) => {
    fetchArticles({ ...(query || {}), current });
  };

  useEffect(() => {
    fetchArticles(query);
  }, [query]);

  const paginationProps = pagination === false ? pagination : pickPaginationPropsFromQuery(query);

  if (!articles) {
    return <Card>loading</Card>;
  }

  return (
    <ArticleListWrapper articles={articles} onChange={handleChange} pagination={paginationProps} />
  );
};
export default ArticleList;
