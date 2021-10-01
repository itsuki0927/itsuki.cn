import { Category } from '@/entities/category';
import { SearchResponse } from '@/entities/http';
import { Tag } from '@/entities/tag';
import request from '@/utils/request';

// 获取标签
export const getTags = () => request.get<SearchResponse<Tag>>('/tag').then(res => res.data);

// 获取分类
export const getCategories = () =>
  request.get<SearchResponse<Category>>('/category').then(res => res.data);
