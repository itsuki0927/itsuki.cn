import { IdentifiableEntity } from '../types/response';

export type BlackList = IdentifiableEntity<{
  ip: string[];
  email: string[];
  keyword: string[];
}>;

export type QueryBlackListResponse = {
  blacklist: BlackList;
};
