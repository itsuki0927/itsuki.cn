import { IdentifiableEntity, SearchResponse } from './response/base';

export type Snippet = IdentifiableEntity<{
  name: string;
  description: string;
  status: number;
  ranks: number;
  code: string;
  skill: string;
  example: string;
  author: string;
  website: string;
  avatar: string;
  email: string;
}>;

export type SearchSnippetsBody = {
  keyword?: string;
};

export type SnippetTypes = {
  snippet: Snippet;
  searchBody: SearchSnippetsBody;
};

export type SearchSnippetsHook<T extends SnippetTypes = SnippetTypes> = {
  data: {
    snippets: SearchResponse<T['snippet']>;
    found: boolean;
  };
  body: T['searchBody'];
  input: T['searchBody'];
  fetcherInput: T['searchBody'];
};

export type SnippetsSchema<T extends SnippetTypes = SnippetTypes> = {
  endpoint: {
    options: Record<string, any>;
    handlers: {
      getSnippets: SearchSnippetsHook<T>;
    };
  };
};

export type GetSnippetOperation<T extends SnippetTypes = SnippetTypes> = {
  data: { snippet: T['snippet'] };
  variables: { snippetId: number };
};

export type GetAllSnippetPathsOperation<T extends SnippetTypes = SnippetTypes> = {
  data: { snippets: Pick<T['snippet'], 'id'>[] };
};

export type GetAllSnippetsOperation<T extends SnippetTypes = SnippetTypes> = {
  data: SearchResponse<T['snippet']>;
  variables: SearchSnippetsBody;
};

export type GetAllSnippetPathsQuery = SearchResponse<Snippet>;
