import { GetAllArticlesOperation } from '@/entities/article';
import { BlogAPIConfig } from '@/helpers/api';
import { Provider } from '@/helpers/api/instance';
import { OperationContext } from '@/helpers/api/operations';

const getAllArticleQuery = '/api/article';

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
    const { data } = await config.fetch(query, { variables });

    return {
      articles: data,
    };
  }

  return getAllArticles;
}

export default getAllArticlesOperation;
