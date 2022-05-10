import request from 'graphql-request';
import { QuerySiteInfoResponse } from '@/entities/siteInfo';
import { QUERY_SITE_INFO } from '@/graphqls/global';
import { endpoint } from './service';

export const getGlobalData = async () => {
  const { siteinfo } = await request<QuerySiteInfoResponse, void>(
    endpoint,
    QUERY_SITE_INFO
  );
  return siteinfo;
};
