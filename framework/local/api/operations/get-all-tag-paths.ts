import { GetAllTagPathsOperation, GetAllTagPathsQuery } from '@/entities/tag';
import { OperationContext } from '@/framework/blog/api/operations';
import { Provider } from '@/framework/local/api';

const getAllTagPathsQuery = '/tag';

function getAllTagPathsOperation({ blog }: OperationContext<Provider>) {
  async function getAllTagPaths<T extends GetAllTagPathsOperation>(): Promise<T['data']>;

  async function getAllTagPaths<T extends GetAllTagPathsOperation>(): Promise<T['data']> {
    const config = blog.getConfig();
    const { data } = await config.fetch<GetAllTagPathsQuery>('GET', getAllTagPathsQuery);

    const tags = data.data.map(item => ({ name: item.name }));

    return { tags };
  }

  return getAllTagPaths;
}

export default getAllTagPathsOperation;
