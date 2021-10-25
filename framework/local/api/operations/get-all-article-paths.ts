import { GetAllArticlePathsOperation, GetAllArticlePathsQuery } from '@/entities/article';
import { OperationContext } from '@/framework/blog/api/operations';
import { Provider } from '@/framework/local/api';

const getAllArticlePathsQuery = '/article';

function getAllArticlePathsOperation({ blog }: OperationContext<Provider>) {
  async function getAllArticlePaths<T extends GetAllArticlePathsOperation>(): Promise<
    T['data']
  > {
    const config = blog.getConfig();
    const { data } = await config.fetch<GetAllArticlePathsQuery>(
      'GET',
      `${getAllArticlePathsQuery}?publish=1`
    );

    const articles = data.data.map(item => item.id);

    return { articles } as any;
  }

  return getAllArticlePaths;
}

export default getAllArticlePathsOperation;
