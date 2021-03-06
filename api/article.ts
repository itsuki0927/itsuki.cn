import request from 'graphql-request';
import {
  LikeArticleResponse,
  QueryArticleResponse,
  QueryArticleSearch,
  QueryArticlesResponse,
  ReadArticleResponse,
  SearchArticlesBody,
} from '@/entities/article';
import { ID } from '@/types/response';
import { PublishState } from '@/constants/article/publish';
import { endpoint } from './service';
import {
  LIKE_ARTICLE,
  QUERY_ARTICLE,
  QUERY_ARTICLES,
  QUERY_ARTICLE_PATHS,
  READ_ARTICLE,
} from '@/graphqls/article';
import { DEFAULT_CURRENT } from '@/constants/value';

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

export const getBannerArticles = () => getArticles({ banner: 1 });

export const getRecentArticles = () => getArticles({ recent: true });

export const getHotArticles = () => getArticles({ hot: true });

export const likeArticle = (id: number) =>
  request<LikeArticleResponse, ID>(endpoint, LIKE_ARTICLE, { id });

export const readArticle = (id: number) =>
  request<ReadArticleResponse, ID>(endpoint, READ_ARTICLE, { id });
