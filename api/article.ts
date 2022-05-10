import request from 'graphql-request';
import {
  QueryArticleResponse,
  QueryArticleSearch,
  QueryArticlesResponse,
  SearchArticlesBody,
} from '@/entities/article';
import { ID } from '@/types/response';
import { PublishState } from '@/constants/article/publish';
import service, { endpoint } from './service';
import { QUERY_ARTICLE, QUERY_ARTICLES, QUERY_ARTICLE_PATHS } from '@/graphqls/article';
import { DEFAULT_CURRENT } from '@/constants/pagination';

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

export const getArchives = () => getArticles({ current: DEFAULT_CURRENT, pageSize: 500 });

export const getAllArticlePaths = async () => {
  const { articles } = await request<QueryArticlesResponse, QueryArticleSearch>(
    endpoint,
    QUERY_ARTICLE_PATHS
  );
  return articles.data.map(item => `/article/${item.id}`);
};

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
