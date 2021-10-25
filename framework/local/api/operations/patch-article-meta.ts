import { PatchArticleMetaOperation } from '@/entities/article';
import { OperationContext } from '@/framework/blog/api/operations';
import { Provider } from '@/framework/local/api';

const PatchArticleMetaQuery = '/article';

function patchArticleMetaOperation({ blog }: OperationContext<Provider>) {
  async function patchArticleMeta<T extends PatchArticleMetaOperation>({
    variables,
  }: {
    variables: T['variables'];
  }): Promise<void> {
    const config = blog.getConfig();

    config.fetch('PATCH', `${PatchArticleMetaQuery}/${variables.id}`, {
      meta: variables.meta,
    });
  }

  return patchArticleMeta;
}

export default patchArticleMetaOperation;
