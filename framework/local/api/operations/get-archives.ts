import { ArticleArchiveResponse, GetArchiveOperation } from '@/entities/article';
import { OperationContext } from '@/framework/blog/api/operations';
import { Provider } from '@/framework/local/api';

const GetArticleQuery = '/article';

function getArchiveOperation({ blog }: OperationContext<Provider>) {
  async function getArchives<T extends GetArchiveOperation>(): Promise<T['data']> {
    const config = blog.getConfig();
    const { data: archives } = await config?.fetch<ArticleArchiveResponse>(
      'GET',
      `${GetArticleQuery}/archive`
    );

    return { archives };
  }

  return getArchives;
}

export default getArchiveOperation;
