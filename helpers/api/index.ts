// eslint-disable-next-line import/no-cycle
import {
  AllOperations,
  APIOperations,
  defaultOperations,
  OPERATIONS,
} from './operations';

export type APIProvider = {
  config: BlogAPIConfig;
  operations: APIOperations<any>;
};

export type BlogAPI<P extends APIProvider = APIProvider> = BlogAPICore<P> &
  AllOperations<P>;

export class BlogAPICore<P extends APIProvider = APIProvider> {
  constructor(readonly provider: P) {}

  getConfig(userConfig: Partial<P['config']> = {}): P['config'] {
    return Object.entries(userConfig).reduce(
      (cfg, [key, value]) => Object.assign(cfg, { [key]: value }),
      { ...this.provider.config }
    );
  }

  setConfig(newConfig: Partial<P['config']>) {
    Object.assign(this.provider.config, newConfig);
  }
}
export function getBlogApi<P extends APIProvider>(customProvider: P): BlogAPI<P> {
  const blog = Object.assign(
    new BlogAPICore(customProvider),
    defaultOperations as AllOperations<P>
  );
  const ops = customProvider.operations;

  OPERATIONS.forEach(k => {
    const op = ops[k];
    if (op) {
      blog[k] = op({ blog }) as AllOperations<P>[typeof k];
    }
  });

  return blog;
}

export interface BlogAPIConfig {
  locale?: string;
  locales?: string[];
  blogUrl: string;
  fetch<Data = any, Variables = any>(
    query: string,
    queryData?: BlogAPIFetchOption<Variables>,
    fetchOptions?: RequestInit
  ): Promise<FetcherResult<Data>>;
}

export type ApiFetcher<Data extends FetcherResult = FetcherResult, Variables = any> = (
  query: string,
  queryData?: BlogAPIFetchOption<Variables>,
  fetchOptions?: RequestInit
) => Promise<Data>;

export type FetcherResult<T = any> = {
  data: T;
  status: number;
  message: string;
  success: boolean;
};

export interface BlogAPIFetchOption<Variables> {
  variables?: Variables;
  preview?: boolean;
}
