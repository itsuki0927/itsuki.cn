import { Article, SearchArticlesBody } from '@/entities/article';
import { SearchResponse } from '@/types/response';
import service from './service';

export const getArticles = (params?: SearchArticlesBody) =>
  service.request<void, SearchResponse<Article>>({
    method: 'get',
    url: '/article',
    params,
  });

export const getPublishArticles = () => getArticles({ pinned: 1 });

export const getBannerArticles = () => getArticles({ banner: 1 });
