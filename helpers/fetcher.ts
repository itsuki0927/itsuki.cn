import { API_URL, API_VERSION } from '@/configs/app';
import handleFetchResponse from './handle-fetch-response';
import { Fetcher } from './utils/types';

const fixPath = (url = '/') => (url.startsWith('/') ? url : `/${url}`);

const buildApiPath = (url = '/') => `${API_URL}/${API_VERSION}${fixPath(url)}`;

const isGet = (method: string) => method.toLowerCase() === 'get';

const fetcher: Fetcher = async ({ url, method = 'POST', variables, query }) => {
  const { locale, ...rest } = variables ?? {};

  const getBody = (requestMethod: string) =>
    isGet(requestMethod) ? {} : { body: JSON.stringify({ query, variables: rest }) };

  return handleFetchResponse(
    await fetch(buildApiPath(url), {
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
