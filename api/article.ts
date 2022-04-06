import {
  Article,
  ArticleArchiveResponse,
  ArticleDetailResponse,
  SearchArticlesBody,
} from '@/entities/article';
import { SearchResponse } from '@/types/response';
import service from './service';

export const getArticles = (params?: SearchArticlesBody) =>
  service.request<void, SearchResponse<Article>>({
    method: 'get',
    url: '/article',
    params,
  });

export const getBannerArticles = () => getArticles({ banner: 1 });

export const getArticle = (id: number | string) =>
  service.request<void, ArticleDetailResponse>({
    method: 'get',
    url: `/article/${id}`,
  });

export const getArchives = () =>
  service.request<void, ArticleArchiveResponse>({
    method: 'get',
    url: '/article/archive',
  });

export const getAllArticlePaths = () =>
  service
    .request<void, { id: number }[]>({
      method: 'get',
      url: 'article/paths',
    })
    .then(res => res.map(item => `/article/${item.id}`));

export const likeArticle = (id: number) =>
  service.request<void, number>({
    method: 'patch',
    url: `/article/${id}/like`,
  });
