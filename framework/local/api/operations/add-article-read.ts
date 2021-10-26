import { AddArticleReadOperation } from '@/entities/article';
import { OperationContext } from '@/framework/blog/api/operations';
import { Provider } from '@/framework/local/api';

const AddArticleReadQuery = '/article';

function addArticleReadOperation({ blog }: OperationContext<Provider>) {
  async function addArticleRead<T extends AddArticleReadOperation>({
    variables,
  }: {
    variables: T['variables'];
  }): Promise<void> {
    const config = blog.getConfig();

    config.fetch('PATCH', `${AddArticleReadQuery}/${variables.articleId}`, {
      meta: 'reading',
    });
  }

  return addArticleRead;
}

export default addArticleReadOperation;
