import { IdentifiableEntity, SearchResponse } from './response/base';

export type Tag = IdentifiableEntity<{
  name: string;
  description: string;
  path: string;
  count: number;
  sort: number;
  expand?: string;
}>;

export type GetAllTagPathsOperation = {
  data: { tags: Pick<Tag, 'name'>[] };
};

export type GetAllTagPathsQuery = SearchResponse<Tag>;
