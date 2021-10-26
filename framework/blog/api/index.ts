/* eslint-disable import/no-cycle */
import { NextApiHandler } from 'next';
import { ArticlesSchema } from '@/entities/article';
import {
  AllOperations,
  APIOperations,
  defaultOperations,
  OPERATIONS,
} from './operations';
import { APIEndpoint, APIHandler } from './utils/types';
import { CommentSchema } from '@/entities/comment';

export type APISchemas = ArticlesSchema | CommentSchema;

export type GetAPISchema<C extends BlogAPI<any>, S extends APISchemas = APISchemas> = {
  schema: S;
  endpoint: EndpointContext<C, S['endpoint']>;
};

export type EndpointContext<C extends BlogAPI, E extends EndpointSchemaBase> = {
  handler: Endpoint<C, E>;
  handlers: EndpointHandlers<C, E>;
};

export type EndpointSchemaBase = {
  options: Record<string, any>;
  handlers: {
    [k: string]: { data?: any; body?: any };
  };
};

export type Endpoint<C extends BlogAPI, E extends EndpointSchemaBase> = APIEndpoint<
  C,
  EndpointHandlers<C, E>,
  any,
  E['options']
>;

export type EndpointHandlers<C extends BlogAPI, E extends EndpointSchemaBase> = {
  [H in keyof E['handlers']]: APIHandler<
    C,
    EndpointHandlers<C, E>,
    NonNullable<E['handlers'][H]>['data'],
    NonNullable<E['handlers'][H]>['body'],
    E['options']
  >;
};
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

export function getEndpoint<P extends APIProvider, T extends GetAPISchema<any, any>>(
  blog: BlogAPI<P>,
  context: T['endpoint'] & {
    config?: P['config'];
    options?: T['schema']['endpoint']['options'];
  }
): NextApiHandler {
  const cfg = blog.getConfig(context.config);

  return function apiHandler(req, res) {
    return context.handler({
      req,
      res,
      blog,
      config: cfg,
      handlers: context.handlers,
      options: context.options ?? {},
    });
  };
}

export const createEndpoint =
  <API extends GetAPISchema<any, any>>(endpoint: API['endpoint']) =>
  <P extends APIProvider>(
    blog: BlogAPI<P>,
    context?: Partial<API['endpoint']> & {
      config?: P['config'];
      options?: API['schema']['endpoint']['options'];
    }
  ): NextApiHandler =>
    getEndpoint(blog, { ...endpoint, ...context });

export function getBlogApi<P extends APIProvider>(customProvider: P): BlogAPI<P> {
  const blog = Object.assign(
    new BlogAPICore(customProvider),
    defaultOperations as AllOperations<P>
  );
  const ops = customProvider.operations;

  OPERATIONS.forEach(k => {
    const op = ops[k];
    if (op) {
      // TODO: any顶一下
      // blog[k] = op({ blog }) as AllOperations<P>[typeof k];
      blog[k] = op({ blog }) as any;
    }
  });

  return blog;
}

export interface BlogAPIConfig {
  locale?: string;
  locales?: string[];
  blogUrl: string;
  apiVersion: string;
  // fetch<Data = any, Variables = any>(
  //   query: string,
  //   queryData?: BlogAPIFetchOption<Variables>,
  //   fetchOptions?: RequestInit
  // ): Promise<FetcherResult<Data>>;
  fetch: <T>(
    method: string,
    resource: string,
    body?: Record<string, unknown>,
    fetchOptions?: Record<string, any>
  ) => Promise<FetcherResult<T>>;
}

export type ApiFetcher<Data extends FetcherResult = FetcherResult, Variables = any> = (
  query: string,
  queryData?: BlogAPIFetchOption<Variables>,
  fetchOptions?: RequestInit
) => Promise<Data>;

export type FetcherResult<Data = any> = {
  data: Data;
  status: number;
  message: string;
  success: boolean;
};

export interface BlogAPIFetchOption<Variables> {
  variables?: Variables;
  preview?: boolean;
}
