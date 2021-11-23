import { GetAllSnippetPathsOperation, GetAllSnippetPathsQuery } from '@/entities/snippet';
import { OperationContext } from '@/framework/blog/api/operations';
import { Provider } from '@/framework/local/api';

const getAllSnippetPathsQuery = '/snippet';

function getAllSnippetPathsOperation({ blog }: OperationContext<Provider>) {
  async function getAllSnippetPaths<T extends GetAllSnippetPathsOperation>(): Promise<
    T['data']
  > {
    const config = blog.getConfig();
    const { data } = await config.fetch<GetAllSnippetPathsQuery>(
      'GET',
      `${getAllSnippetPathsQuery}?publish=1`
    );

    const snippets = data.data.map(item => {
      const rootCategory = item.categories.find(v => v.parentId === 0)!;
      return { id: item.id, categoryPath: rootCategory.path };
    });

    return { snippets };
  }

  return getAllSnippetPaths;
}

export default getAllSnippetPathsOperation;
