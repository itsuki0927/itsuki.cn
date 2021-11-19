import {
  GetSnippetCategoriesOperation,
  GetSnippetCategoriesQuery,
} from '@/entities/snippetCategory';
import { BlogAPIConfig } from '@/framework/blog/api';
import { OperationContext } from '@/framework/blog/api/operations';
import { Provider } from '@/framework/local/api';

const getSnippetCategoryQuery = '/snippet-category';

function getSnippetCategoriesOperation({ blog }: OperationContext<Provider>) {
  async function getSnippetCategories<T extends GetSnippetCategoriesOperation>({
    variables = {},
    config: cfg,
  }: {
    variables?: T['variables'];
    config?: Partial<BlogAPIConfig>;
  } = {}): Promise<T['data']> {
    const config = blog.getConfig(cfg);
    const url = new URL(getSnippetCategoryQuery, 'http://a');
    const { id, parentId } = variables;
    if (id !== undefined) {
      url.searchParams.append('id', `${id}`);
    }
    if (parentId !== undefined) {
      url.searchParams.append('parentId', `${parentId}`);
    }
    const { data: snippetCategories } = await config.fetch<GetSnippetCategoriesQuery>(
      'GET',
      url.pathname + url.search
    );
    return { snippetCategories };
  }

  return getSnippetCategories;
}

export default getSnippetCategoriesOperation;
