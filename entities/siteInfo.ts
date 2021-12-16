import { Category } from './category';
import { IdentifiableEntity } from './response';
import { Tag } from './tag';

export type SystemSettings = IdentifiableEntity<{
  liking: number;
  title: string;
  subtitle: string;
  email: string;
  keywords: string;
  description: string;
  domain: string;
  record: string;
  ipBlackList: string[];
  emailBlackList: string[];
  keywordBlackList: string[];
}>;

export type SiteInfo = {
  tags: Tag[];
  categories: Category[];
  siteInfo: SystemSettings;
};

export type GetSiteInfoOperation = {
  data: SiteInfo;
};
