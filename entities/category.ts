import { IdentifiableEntity } from '../types/response';

export type Category = IdentifiableEntity<{
  name: string;
  description: string;
  path: string;
  count: number;
  sort: number;
  parentId: number;
  expand?: string;
}>;

export type QueryCategoryResponse = { categories: Category[] };
