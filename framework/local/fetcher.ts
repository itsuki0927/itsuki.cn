import handleFetchResponse from './utils/handle-fetch-response';
import { Fetcher } from '../blog/utils/types';

const isGet = (method: string) => method.toLowerCase() === 'get';

const fetcher: Fetcher = async ({
  url = '',
  method = 'POST',
  variables,
  query,
  body: bodyProp,
}) => {
  const { locale, ...rest } = variables ?? {};

  const body = isGet(method)
    ? undefined
    : JSON.stringify({ query, variables: rest, ...bodyProp });

  return handleFetchResponse(
    await fetch(url, {
      body,
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
