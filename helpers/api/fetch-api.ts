import { ApiFetcher, BlogAPIConfig } from '.';
import { FetcherError } from '../utils/errors';

const fetchApi: (getConfig: () => BlogAPIConfig) => ApiFetcher =
  getConfig =>
  async (query: string, { variables, preview } = {}, fetchOptions) => {
    const config = getConfig();
    const res = await fetch(config.blogUrl + (preview ? '/preview' : ''), {
      ...fetchOptions,
      method: 'POST',
      headers: {
        ...fetchOptions?.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });
    const json = await res.json();
    if (json.errors) {
      throw new FetcherError({
        errors: json.errors ?? [{ message: 'Failed to fetch Bigcommerce API' }],
        status: res.status,
      });
    }

    /**
     *
     * data: T;
     * status: number;
     * message: string;
     * success: boolean;
     */
    return {
      data: json.data,
      status: res.status,
      message: json.data.message,
      success: res.status === 200,
    };
  };

export default fetchApi;
