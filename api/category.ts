import request from 'graphql-request';
import { QueryCategoryResponse } from '@/entities/category';
import { QUERY_CATEGORY } from '@/graphqls/category';
import { endpoint } from './service';

export const getAllCategoryPaths = async () => {
  const { categories } = await request<QueryCategoryResponse, void>(
    endpoint,
    QUERY_CATEGORY
  );
  return categories.map(category => `/category/${category.path}`);
};
