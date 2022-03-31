import { SiteInfo } from '@/entities/siteInfo';
import service from './service';

export const getGlobalData = () =>
  service.request<void, SiteInfo>({
    method: 'get',
    url: '/site-info',
  });
