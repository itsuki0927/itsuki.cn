import { ArticlesSchema } from '@/entities/article';
import { createEndpoint, GetAPISchema } from '@/framework/blog/api';
import articlesEndpoint from '@/framework/blog/api/endpoints/articles';
import { ItsukiBlogAPI } from '@/framework/local/api';
// eslint-disable-next-line import/no-cycle
import getArticles from './get-articles';
// eslint-disable-next-line import/no-cycle
import likeArticle from './like-article';

export type ArticlesAPI = GetAPISchema<ItsukiBlogAPI, ArticlesSchema>;

export type ArticlesEndpoint = ArticlesAPI['endpoint'];

export const handlers: ArticlesEndpoint['handlers'] = { getArticles, likeArticle };

const articlesApi = createEndpoint<ArticlesAPI>({
  handler: articlesEndpoint,
  handlers,
});

export default articlesApi;
