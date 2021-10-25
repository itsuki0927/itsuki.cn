import { Article, GetAllArticlesOperation } from '@/entities/article';
import { SearchResponse } from '@/entities/response/base';
import { BlogAPIConfig } from '@/framework/blog/api';
import { OperationContext } from '@/framework/blog/api/operations';
import { Provider } from '@/framework/local/api';

const getAllArticleQuery = '/article';

const LIMIT = 2000;

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
    const { search, category, tag, banner } = variables;
    if (search) {
      url.searchParams.append('search', search);
    }
    if (category) {
      url.searchParams.append('category', category);
    }
    if (tag) {
      url.searchParams.append('tag', tag);
    }
    if (banner) {
      url.searchParams.append('banner', '1');
    }
    url.searchParams.append('publish', '1');
    url.searchParams.append('pageSize', String(LIMIT));
    const res = await config.fetch<GetAllArticlesQuery>('GET', url.pathname + url.search);
    return res.data;
  }

  return getAllArticles;
}

export default getAllArticlesOperation;
