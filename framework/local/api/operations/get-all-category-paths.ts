import {
  GetAllCategoryPathsOperation,
  GetAllCategoryPathsQuery,
} from '@/entities/category';
import { OperationContext } from '@/framework/blog/api/operations';
import { Provider } from '@/framework/local/api';

const getAllCategoryPathsQuery = '/category';

function getAllCategoryPathsOperation({ blog }: OperationContext<Provider>) {
  async function getAllCategoryPaths<T extends GetAllCategoryPathsOperation>(): Promise<
    T['data']
  > {
    const config = blog.getConfig();
    const { data } = await config.fetch<GetAllCategoryPathsQuery>(
      'GET',
      getAllCategoryPathsQuery
    );

    const categories = data.data.map(item => ({ path: item.path }));

    return { categories };
  }

  return getAllCategoryPaths;
}

export default getAllCategoryPathsOperation;
