import { IdentifiableEntity } from './http';

export type Tag = IdentifiableEntity<{
  name: string;
  description: string;
  path: string;
  count: number;
  sort: number;
  expand?: string;
}>;
