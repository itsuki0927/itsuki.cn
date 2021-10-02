import { IdentifiableEntity } from './response/base';

export type SystemSettings = IdentifiableEntity<{
  liking: number;
  title: string;
  subtitle: string;
  email: string;
  keywords: string;
  description: string;
  domain: string;
  record: string;
  ipBlackList?: string | string[];
  emailBlackList?: string | string[];
  keywordBlackList?: string | string[];
}>;
