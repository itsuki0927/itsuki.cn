import { API_URL } from '@/configs/app';
import handleFetchResponse from './handle-fetch-response';
import { Fetcher } from './utils/types';

const fetcher: Fetcher = async ({ url = API_URL, method = 'POST', variables, query }) => {
  const { locale, ...rest } = variables ?? {};

  return handleFetchResponse(
    await fetch(url ?? '', {
      method,
      body: JSON.stringify({ query, variables: rest }),
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
