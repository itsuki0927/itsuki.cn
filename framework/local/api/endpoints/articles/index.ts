import { createEndpoint, GetAPISchema } from '@/framework/blog/api';
import { ArticlesSchema } from '@/entities/article';
import articlesEndpoint from '@/framework/blog/api/endpoints/articles';
import { ItsukiBlogAPI } from '@/framework/local/api';
// eslint-disable-next-line import/no-cycle
import getArticles from './get-articles';

export type ArticlesAPI = GetAPISchema<ItsukiBlogAPI, ArticlesSchema>;

export type ArticlesEndpoint = ArticlesAPI['endpoint'];

export const handlers: ArticlesEndpoint['handlers'] = { getArticles };

const articlesApi = createEndpoint<ArticlesAPI>({
  handler: articlesEndpoint,
  handlers,
});

export default articlesApi;
