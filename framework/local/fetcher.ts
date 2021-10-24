import handleFetchResponse from './utils/handle-fetch-response';
import { Fetcher } from '../blog/utils/types';

const isGet = (method: string) => method.toLowerCase() === 'get';

const fetcher: Fetcher = async ({ url = '', method = 'POST', variables, query }) => {
  const { locale, ...rest } = variables ?? {};

  const getBody = (requestMethod: string) =>
    isGet(requestMethod) ? {} : { body: JSON.stringify({ query, variables: rest }) };

  return handleFetchResponse(
    await fetch(url, {
      ...getBody(method),
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(locale && {
          'Accept-Language': locale,
        }),
      },
    })
  );
};

export default fetcher;
