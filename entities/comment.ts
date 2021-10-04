import { IdentifiableEntity } from './response/base';

export type Comment = IdentifiableEntity<{
  nickname: string;
  email: string;
  website: string;
  content: string;
  liking: number;
  ip: string;
  city: string;
  province: string;
  agent: string;
  status: number;
  fix: string;
  expand: string;
  parentId: number;
  articleId: number;
  articleTitle: string;
  articleDescription: string;
}>;
