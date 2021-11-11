import { GetSnippetOperation, SnippetDetail } from '@/entities/snippet';
import { OperationContext } from '@/framework/blog/api/operations';
import { Provider } from '@/framework/local/api';

const getSnippetQuery = '/snippet';

function getSnippetOperation({ blog }: OperationContext<Provider>) {
  async function getSnippet<T extends GetSnippetOperation>({
    variables,
  }: {
    variables: T['variables'];
  }): Promise<T['data']> {
    const config = blog.getConfig();
    const { data: snippet } = await config?.fetch<SnippetDetail>(
      'GET',
      `${getSnippetQuery}/${variables.snippetId}`
    );

    return { snippet };
  }

  return getSnippet;
}

export default getSnippetOperation;
