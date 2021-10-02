import { Article } from '@/entities/article';
import { SearchResponse } from '@/entities/response/base';
import request from '@/utils/request';

/** 获取文章  */
export const getArticles = () =>
  request.get<SearchResponse<Article>>('/article').then(res => res.data);
