import { IdentifiableEntity, SearchResponse } from '../types/response';

export type Category = IdentifiableEntity<{
  name: string;
  description: string;
  path: string;
  count: number;
  sort: number;
  parentId: number;
  expand?: string;
}>;

export type GetAllCategoryPathsOperation = {
  data: { categories: Pick<Category, 'path'>[] };
};

export type GetAllCategoryPathsQuery = SearchResponse<Category>;
