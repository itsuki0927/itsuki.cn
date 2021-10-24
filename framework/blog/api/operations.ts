// eslint-disable-next-line import/no-cycle
import { GetAllArticlesOperation } from '@/entities/article';
// eslint-disable-next-line import/no-cycle
import { APIProvider, BlogAPI } from '.';

const noop = () => {
  throw new Error('Not implemented');
};

export const OPERATIONS = ['getAllArticles'] as const;

export const defaultOperations = OPERATIONS.reduce((ops, k) => {
  // eslint-disable-next-line no-param-reassign
  ops[k] = noop;
  return ops;
}, {} as { [K in AllowdOperations]: typeof noop });

export type AllowdOperations = typeof OPERATIONS[number];

export type Operations<P extends APIProvider> = {
  getAllArticles: {
    <T extends GetAllArticlesOperation>(opts: {
      variables?: T['variables'];
      config?: P['config'];
      preview?: boolean;
    }): Promise<T['data']>;

    <T extends GetAllArticlesOperation>(
      opts: {
        variables?: T['variables'];
        config?: P['config'];
        preview?: boolean;
      } & OperationOptions
    ): Promise<T['data']>;
  };
};

/**
 * {
 *    getAllArticles?: (ctx: BlogAPI<P>) => () => Promise<Data>
 * }
 */
export type APIOperations<P extends APIProvider> = {
  [K in keyof Operations<P>]?: (ctx: OperationContext<P>) => Operations<P>[K];
};

/**
 * {
 *    getAllArticles: () => Promise<Data> | () => never
 * }
 */
export type AllOperations<P extends APIProvider> = {
  [K in keyof APIOperations<P>]-?: P['operations'][K] extends (...args: any) => any
    ? ReturnType<P['operations'][K]>
    : typeof noop;
};

export type OperationContext<P extends APIProvider> = {
  blog: BlogAPI<P>;
};

export type OperationOptions =
  | { query: string; url?: never }
  | { query?: never; url: string };
