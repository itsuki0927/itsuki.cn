import { IdentifiableEntity, SearchResponse } from './response';
import { SnippetCategory } from './snippetCategory';

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
  categories: SnippetCategory[];
}>;

export type SnippetDetail = Snippet & {
  skillHtml: string;
  codeHtml: string;
  exampleHtml: string;
};

export type SearchSnippetsBody = {
  keyword?: string;
  categoryPath?: string;
  current?: number;
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

export type SnippetsSchema<T extends SnippetTypes = SnippetTypes> = {
  endpoint: {
    options: Record<string, any>;
    handlers: {
      getSnippets: SearchSnippetsHook<T>;
    };
  };
};

export type GetSnippetOperation<T extends SnippetTypes = SnippetTypes> = {
  data: { snippet: T['snippetDetail'] };
  variables: { snippetId: number };
};

export type GetAllSnippetPathsOperation<T extends SnippetTypes = SnippetTypes> = {
  data: {
    snippets: {
      id: T['snippet']['id'];
      categoryPath: string;
    }[];
  };
};

export type GetAllSnippetsOperation<T extends SnippetTypes = SnippetTypes> = {
  data: SearchResponse<T['snippet']>;
  variables: SearchSnippetsBody;
};

export type GetAllSnippetPathsQuery = SearchResponse<Snippet>;
