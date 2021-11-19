import {
  AddArticleReadOperation,
  GetAllArticlePathsOperation,
  GetAllArticlesOperation,
  GetArchiveOperation,
  GetArticleOperation,
} from '@/entities/article';
import { GetAllCategoryPathsOperation } from '@/entities/category';
import { GetSiteInfoOperation } from '@/entities/siteInfo';
import {
  GetAllSnippetPathsOperation,
  GetAllSnippetsOperation,
  GetSnippetOperation,
} from '@/entities/snippet';
import { GetSnippetCategoriesOperation } from '@/entities/snippetCategory';
import { GetAllTagPathsOperation } from '@/entities/tag';
import { APIProvider, BlogAPI } from '.';

const noop = () => {
  throw new Error('Not implemented');
};

export const OPERATIONS = [
  'getArticle',
  'addArticleRead',
  'getAllArticles',
  'getAllArticlePaths',
  'getAllTagPaths',
  'getAllCategoryPaths',
  'getSiteInfo',
  'getAllSnippets',
  'getSnippet',
  'getAllSnippetPaths',
  'getArchives',
  'getSnippetCategories',
] as const;

export const defaultOperations = OPERATIONS.reduce((ops, k) => {
  // eslint-disable-next-line no-param-reassign
  ops[k] = noop;
  return ops;
}, {} as { [K in AllowdOperations]: typeof noop });

export type AllowdOperations = typeof OPERATIONS[number];

export type Operations<P extends APIProvider> = {
  getArticle: {
    <T extends GetArticleOperation>(opts: { variables: T['variables'] }): Promise<
      T['data']
    >;
  };

  addArticleRead: {
    <T extends AddArticleReadOperation>(opts: {
      variables: T['variables'];
    }): Promise<void>;
  };

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

  getAllArticlePaths: {
    <T extends GetAllArticlePathsOperation>(): Promise<T['data']>;
  };

  getSiteInfo: {
    <T extends GetSiteInfoOperation>(opts: { config?: P['config'] }): Promise<T['data']>;
  };

  getAllTagPaths: {
    <T extends GetAllTagPathsOperation>(): Promise<T['data']>;
  };

  getAllCategoryPaths: {
    <T extends GetAllCategoryPathsOperation>(): Promise<T['data']>;
  };

  getAllSnippets: {
    <T extends GetAllSnippetsOperation>(opts: {
      config?: P['config'];
      variables: T['variables'];
    }): Promise<T['data']>;
  };

  getSnippet: {
    <T extends GetSnippetOperation>(opts: {
      config?: P['config'];
      variables: T['variables'];
    }): Promise<T['data']>;
  };

  getAllSnippetPaths: {
    <T extends GetAllSnippetPathsOperation>(): Promise<T['data']>;
  };

  getArchives: {
    <T extends GetArchiveOperation>(): Promise<T['data']>;
  };

  getSnippetCategories: {
    <T extends GetSnippetCategoriesOperation>(opts: {
      variables?: T['variables'];
      config?: P['config'];
    }): Promise<T['data']>;
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
