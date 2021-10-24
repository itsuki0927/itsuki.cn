import { Article, GetAllArticlesOperation } from '@/entities/article';
import { SearchResponse } from '@/entities/response/base';
import { BlogAPIConfig } from '@/framework/blog/api';
import { OperationContext } from '@/framework/blog/api/operations';
import { Provider } from '@/framework/local/api';

const getAllArticleQuery = '/article';

export type GetAllArticlesQuery = SearchResponse<Article>;

function getAllArticlesOperation({ blog }: OperationContext<Provider>) {
  async function getAllArticles<T extends GetAllArticlesOperation>(opts?: {
    variables?: T['variables'];
    config?: Partial<BlogAPIConfig>;
    preview?: boolean;
  }): Promise<T['data']>;

  async function getAllArticles<T extends GetAllArticlesOperation>(opts: {
    variables?: T['variables'];
    config?: Partial<BlogAPIConfig>;
    preview?: boolean;
  }): Promise<T['data']>;

  async function getAllArticles<T extends GetAllArticlesOperation>({
    query = getAllArticleQuery,
    variables = {},
    config: cfg,
  }: {
    query?: string;
    variables?: T['variables'];
    config?: Partial<BlogAPIConfig>;
    preview?: boolean;
  } = {}): Promise<T['data']> {
    const config = blog.getConfig(cfg);
    const url = new URL(query, 'http://a');
    if (variables.search) {
      url.searchParams.append('search', variables.search);
    }
    const res = await config.fetch<GetAllArticlesQuery>('GET', url.pathname + url.search);
    return res.data;
  }

  return getAllArticles;
}

export default getAllArticlesOperation;
