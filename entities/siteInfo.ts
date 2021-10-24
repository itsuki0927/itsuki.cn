import { Category } from './category';
import { SystemSettings } from './systemSettings';
import { Tag } from './tag';

export type SiteInfo = {
  tags: Tag[];
  categories: Category[];
  siteInfo: SystemSettings;
};

export type GetSiteInfoOperation = {
  data: SiteInfo;
};
