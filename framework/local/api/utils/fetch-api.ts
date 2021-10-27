import { BlogAPIConfig, FetcherResult } from '@/framework/blog/api';
import { FetcherError } from '@/framework/blog/utils/errors';

const fetchData = async <T>(opts: {
  path: string;
  method: string;
  config: BlogAPIConfig;
  fetchOptions?: Record<string, any>;
  body?: Record<string, unknown>;
}): Promise<FetcherResult<T>> => {
  const { path, method, fetchOptions, body, config } = opts;
  const url = `${config.blogUrl}/${config.apiVersion}${path}`;
  const res = await fetch(url, {
    ...fetchOptions,
    method,
    headers: {
      ...fetchOptions?.headers,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const json = await res.json();

  if (json.status !== 200 && json.success === false) {
    const { message } = json;
    throw new FetcherError({
      errors: message ? [{ message }] : [{ message: 'Failed to fetch Itsuki Blog API' }],
      status: json.status,
    });
  }

  /**
   * data: T;
   * status: number;
   * message: string;
   * success: boolean;
   */
  return {
    data: json.data,
    status: json.status || res.status,
    message: json.message || '请求成功',
    success: json.status === 200 && json.success && res.ok,
  } as FetcherResult<T>;
};

export const createFetcher: (
  getConfig: () => BlogAPIConfig
) => <T>(
  method: string,
  path: string,
  body?: Record<string, unknown>,
  fetchOptions?: Record<string, any>
) => Promise<FetcherResult<T>> =
  getConfig =>
  async <T>(
    method: string,
    path: string,
    body?: Record<string, unknown>,
    fetchOptions?: Record<string, string>
  ) => {
    const config = getConfig();
    const data = await fetchData<T>({
      fetchOptions,
      config,
      method,
      path,
      body,
    });
    return data;
  };

export default {};
