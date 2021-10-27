import { ArticlesSchema } from '@/entities/article';
import { GetAPISchema } from '..';
import { BlogAPIError } from '../utils/errors';
import isAllowedOperation from '../utils/is-allowed-operation';

const articlesEndpoint: GetAPISchema<any, ArticlesSchema>['endpoint']['handler'] =
  async ctx => {
    const { req, res, handlers } = ctx;

    if (
      !isAllowedOperation(req, res, {
        GET: handlers.getArticles,
        PATCH: handlers.likeArticle,
      })
    ) {
      return;
    }

    try {
      if (req.method === 'GET') {
        const body = req.query;
        return await handlers.getArticles({ ...ctx, body });
      }
      if (req.method === 'PATCH') {
        const { body } = req;
        return await handlers.likeArticle({ ...ctx, body });
      }
    } catch (error) {
      const message =
        error instanceof BlogAPIError
          ? 'An unexpected error ocurred with the Blog API'
          : 'An unexpected error ocurred';

      res.status(500).json({ data: null, errors: [{ message }] });
    }
  };

export default articlesEndpoint;
