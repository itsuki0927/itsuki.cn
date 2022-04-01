import { Category } from '@/entities/category';
import { SearchResponse } from '@/types/response';
import service from './service';

export const getCategories = () =>
  service.request<void, SearchResponse<Category>>({
    method: 'get',
    url: '/category',
  });

export const getAllCategoryPaths = () =>
  getCategories().then(({ data }) => data.map(item => `/category/${item.path}`));
