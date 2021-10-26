import { Article } from '@/entities/article';
import { ArticleSearchRequest } from '@/entities/request/article';
import { SearchResponse } from '@/entities/response/base';
import request from '@/utils/request';

/** 获取文章  */
export const getArticles = (params?: ArticleSearchRequest) =>
  request.get<SearchResponse<Article>>('/article', { params }).then(res => res.data);

/** 根据id获取文章 */
export const getArticleById = (id: string | number) =>
  request.get<Article>(`/article/${id}`).then(res => res.data);

/** 更新文章meta */
export const addArticleRead = (id: number, data: { meta: string }) =>
  request.patch(`/article/${id}`, data).then(res => res.data);
