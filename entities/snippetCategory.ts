import { IdentifiableEntity, SearchResponse } from './response/base';

export type SnippetCategory = IdentifiableEntity<{
  name: string;
  description: string;
  path: string;
  count: number;
  sort: number;
  parentId: number;
  expand?: string;
}>;

export type SearchSnippetCategoriesBody = {
  parentId?: number;
  id?: number;
};

export type SnippetCategoryTypes = {
  snippetCategory: SnippetCategory;
  searchBody: SearchSnippetCategoriesBody;
};

export type GetSnippetCategoriesOperation<
  T extends SnippetCategoryTypes = SnippetCategoryTypes
> = {
  data: { snippetCategories: SearchResponse<SnippetCategory> };
  variables: T['searchBody'];
};

export type GetSnippetCategoriesQuery = SearchResponse<SnippetCategory>;
