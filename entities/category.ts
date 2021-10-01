import { IdentifiableEntity } from './http';

export type Category = IdentifiableEntity<{
  name: string;
  description: string;
  path: string;
  count: number;
  sort: number;
  parentId: number;
  expand?: string;
}>;
