import { GetAllSnippetPathsQuery, GetAllSnippetsOperation } from '@/entities/snippet';
import { BlogAPIConfig } from '@/framework/blog/api';
import { OperationContext } from '@/framework/blog/api/operations';
import { Provider } from '@/framework/local/api';

const getAllSnippetQuery = '/snippet';

const LIMIT = 15;

function getAllSnippetsOperation({ blog }: OperationContext<Provider>) {
  async function getAllSnippets<T extends GetAllSnippetsOperation>({
    variables = {},
    config: cfg,
  }: {
    variables?: T['variables'];
    config?: Partial<BlogAPIConfig>;
  } = {}): Promise<T['data']> {
    const config = blog.getConfig(cfg);
    const url = new URL(getAllSnippetQuery, 'http://a');
    const { keyword, categoryPath, current } = variables;
    if (keyword) {
      url.searchParams.append('keyword', keyword);
    }
    if (categoryPath) {
      url.searchParams.append('categoryPath', categoryPath);
    }
    if (current) {
      url.searchParams.append('current', `${current}`);
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
