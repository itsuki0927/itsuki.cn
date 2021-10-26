import { CommentSchema } from '@/entities/comment';
import { GetAPISchema } from '..';
import { BlogAPIError } from '../utils/errors';
import isAllowedOperation from '../utils/is-allowed-operation';

const commentEndpoints: GetAPISchema<any, CommentSchema>['endpoint']['handler'] =
  async ctx => {
    const { req, res, handlers } = ctx;

    if (
      !isAllowedOperation(req, res, {
        PATCH: handlers.likeComment,
      })
    ) {
      return;
    }

    try {
      const { body } = req;
      if (req.method === 'PATCH') {
        return await handlers.likeComment({ ...ctx, body });
      }
    } catch (error) {
      const message =
        error instanceof BlogAPIError
          ? 'An unexpected error ocurred with the Blog API'
          : 'An unexpected error ocurred';

      res.status(500).json({ data: null, errors: [{ message }] });
    }
  };

export default commentEndpoints;
