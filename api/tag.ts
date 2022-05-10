import request from 'graphql-request';
import { QueryTagResponse } from '@/entities/tag';
import { endpoint } from './service';
import { QUERY_TAG } from '@/graphqls/tag';

export const getAllTagPaths = async () => {
  const { tags } = await request<QueryTagResponse, any>(endpoint, QUERY_TAG, {
    search: {},
  });
  return tags.data.map(item => `/tag/${item.path}`);
};
