import request from 'graphql-request';
import { QueryCategoryResponse } from '@/entities/category';
import { QUERY_CATEGORY, QUERY_CATEGORY_PATHS } from '@/graphqls/category';
import { endpoint } from './service';

export const getAllCategories = async () => {
  const { categories } = await request<QueryCategoryResponse, void>(
    endpoint,
    QUERY_CATEGORY
  );
  return categories;
};

export const getAllCategoryPaths = async () => {
  const { categories } = await request<QueryCategoryResponse, void>(
    endpoint,
    QUERY_CATEGORY_PATHS
  );
  return categories.map(category => `/category/${category.path}`);
};
