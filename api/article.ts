import request from 'graphql-request';
import {
  ArticleArchiveResponse,
  QueryArticleResponse,
  QueryArticleSearch,
  QueryArticlesResponse,
  SearchArticlesBody,
} from '@/entities/article';
import { ID } from '@/types/response';
import { PublishState } from '@/constants/article/publish';
import service, { endpoint } from './service';
import { QUERY_ARTICLE, QUERY_ARTICLES } from '@/graphqls/article';

export const getArticles = async (params?: SearchArticlesBody) => {
  const { articles } = await request<QueryArticlesResponse, QueryArticleSearch>(
    endpoint,
    QUERY_ARTICLES,
    params
      ? {
          search: {
            ...params,
            publish: PublishState.Published,
          },
        }
      : undefined
  );
  return articles;
};

export const getBannerArticles = () => getArticles({ banner: 1 });

export const getArticle = async (id: number) => {
  const { article } = await request<QueryArticleResponse, ID>(endpoint, QUERY_ARTICLE, {
    id,
  });
  return article;
};

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

export const addArticleReading = (id: number) =>
  service.request<void, number>({
    method: 'patch',
    url: `/article/${id}/read`,
  });
