import request from 'graphql-request';
import { QuerySiteSummaryResponse } from '@/entities/summary';
import { endpoint } from './service';
import { QUERY_SITE_SUMMARY } from '@/graphqls/summary';

export const getSiteSummary = async () => {
  const { summary } = await request<QuerySiteSummaryResponse, any>(
    endpoint,
    QUERY_SITE_SUMMARY
  );
  return summary;
};
