import { IdentifiableEntity, SearchResponse } from '../types/response';

export type Tag = IdentifiableEntity<{
  name: string;
  description: string;
  path: string;
  count: number;
  sort: number;
  expand?: string;
}>;

export type GetAllTagPathsQuery = SearchResponse<Tag>;
