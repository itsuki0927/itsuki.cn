import { NextApiRequest, NextApiResponse } from 'next';
import { BlogAPI } from '..';

export type ErrorData = {
  message: string;
  code?: string | number;
};

export type APIResponse<Data = any> =
  | { data: Data; errors?: ErrorData[] }
  | (Data extends null
      ? { data: null; errors?: ErrorData[] }
      : { data: null; errors: ErrorData[] });

export type APIHandlerContext<
  C extends BlogAPI,
  H extends APIHandlers<C> = Record<string, any>,
  Data = any,
  Options extends Record<string, any> = Record<string, any>
> = {
  req: NextApiRequest;
  res: NextApiResponse<APIResponse<Data>>;
  blog: C;
  config: C['provider']['config'];
  handlers: H;
  options: Options;
};

export type APIHandler<
  C extends BlogAPI,
  H extends APIHandlers<C> = Record<string, any>,
  Data = any,
  Body = any,
  Options extends Record<string, any> = Record<string, any>
> = (
  context: APIHandlerContext<C, H, Data, Options> & { body: Body }
) => void | Promise<void>;

export type APIHandlers<C extends BlogAPI> = {
  [k: string]: APIHandler<C, any, any, any, any>;
};

export type APIEndpoint<
  C extends BlogAPI = BlogAPI,
  H extends APIHandlers<C> = Record<string, any>,
  Data = any,
  Options extends Record<string, any> = Record<string, any>
> = (context: APIHandlerContext<C, H, Data, Options>) => void | Promise<void>;
