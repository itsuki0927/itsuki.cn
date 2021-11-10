import { GetAllSnippetPathsQuery, GetAllSnippetsOperation } from '@/entities/snippet';
import { BlogAPIConfig } from '@/framework/blog/api';
import { OperationContext } from '@/framework/blog/api/operations';
import { Provider } from '@/framework/local/api';

const getAllSnippetQuery = '/snippet';

const LIMIT = 2000;

function getAllSnippetsOperation({ blog }: OperationContext<Provider>) {
  async function getAllSnippets<T extends GetAllSnippetsOperation>({
    query = getAllSnippetQuery,
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
    const { keyword } = variables;
    if (keyword) {
      url.searchParams.append('name', keyword);
    }
    url.searchParams.append('status', '1');
    url.searchParams.append('pageSize', `${LIMIT}`);
    const res = await config.fetch<GetAllSnippetPathsQuery>(
      'GET',
      url.pathname + url.search
    );
    return res.data;
  }

  return getAllSnippets;
}

export default getAllSnippetsOperation;
