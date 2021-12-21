import { IdentifiableEntity, SearchResponse } from '../types/response';

export type Tag = IdentifiableEntity<{
  name: string;
  description: string;
  path: string;
  count: number;
  sort: number;
  expand?: string;
}>;

export type GetAllTagPathsOperation = {
  data: { tags: Pick<Tag, 'path'>[] };
};

export type GetAllTagPathsQuery = SearchResponse<Tag>;
