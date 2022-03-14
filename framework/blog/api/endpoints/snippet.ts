import { SearchSnippetsBody, SnippetsSchema } from '@/entities/snippet';
import { GetAPISchema } from '..';
import { BlogAPIError } from '../utils/errors';
import isAllowedOperation from '../utils/is-allowed-operation';

const snippetEndpoints: GetAPISchema<
  any,
  SnippetsSchema
>['endpoint']['handler'] = async ctx => {
  const { req, res, handlers } = ctx;

  if (
    !isAllowedOperation(req, res, {
      GET: handlers.getSnippets,
    })
  ) {
    return;
  }

  try {
    if (req.method === 'GET') {
      const body = req.query as unknown as SearchSnippetsBody;
      handlers.getSnippets({ ...ctx, body });
    }
  } catch (error) {
    const message =
      error instanceof BlogAPIError
        ? 'An unexpected error ocurred with the Blog API'
        : 'An unexpected error ocurred';

    res.status(500).json({ data: null, errors: [{ message }] });
  }
};

export default snippetEndpoints;
