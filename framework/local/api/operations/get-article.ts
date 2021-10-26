import { Article, GetArticleOperation } from '@/entities/article';
import { OperationContext } from '@/framework/blog/api/operations';
import { Provider } from '@/framework/local/api';

const GetArticleQuery = '/article';

function getArticleOperation({ blog }: OperationContext<Provider>) {
  async function getArticle<T extends GetArticleOperation>({
    variables,
  }: {
    variables: T['variables'];
  }): Promise<T['data']> {
    const config = blog.getConfig();
    const { data: article } = await config?.fetch<Article>(
      'GET',
      `${GetArticleQuery}/${variables.articleId}`
    );

    return { article };
  }

  return getArticle;
}

export default getArticleOperation;
