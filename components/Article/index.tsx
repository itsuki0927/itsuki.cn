import React, { useEffect, useState } from 'react';
import { getArticles } from '@/api/article';
import Card from '@/components/Card';
import { Article } from '@/entities/article';
import { ArticleSearchRequest } from '@/entities/request/article';
import { SearchResponse } from '@/entities/response/base';
import { CurrentPageSizeProps, pickPaginationPropsFromQuery } from '../Pagination/util';
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
    const temp = await getArticles(params);
    setArticles(temp);
  };

  const handleChange = (current: number) => {
    fetchArticles({ ...(query || {}), current, pageSize: query?.pageSize || 8 });
  };

  useEffect(() => {
    fetchArticles(query);
  }, [query]);

  const paginationProps =
    pagination === false ? pagination : pickPaginationPropsFromQuery(query);

  if (!articles) {
    return <Card>loading</Card>;
  }

  return (
    <ArticleListWrapper
      articles={articles}
      onChange={handleChange}
      pagination={{
        ...paginationProps,
        pageSize: (paginationProps as CurrentPageSizeProps).pageSize || 8,
      }}
    />
  );
};
export default ArticleList;
