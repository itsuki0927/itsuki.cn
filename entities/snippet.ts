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

export type SnippetDetail = Snippet & {
  skillHtml: string;
  codeHtml: string;
  exampleHtml: string;
};

export type SearchSnippetsBody = {
  keyword?: string;
};

export type SnippetTypes = {
  snippet: Snippet;
  snippetDetail: SnippetDetail;
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

export type GetSnippetOperation<T extends SnippetTypes = SnippetTypes> = {
  data: { snippet: T['snippetDetail'] };
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
