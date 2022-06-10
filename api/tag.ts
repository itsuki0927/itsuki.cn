import request from 'graphql-request';
import { QueryTagResponse } from '@/entities/tag';
import { endpoint } from './service';
import { QUERY_TAGS, QUERY_TAG_PATHS } from '@/graphqls/tag';

export const getAllTagPaths = async () => {
  const { tags } = await request<QueryTagResponse, any>(endpoint, QUERY_TAG_PATHS, {
    search: {},
  });
  return tags.data.map(item => `/tag/${item.path}`);
};

export const getAllTags = async () => {
  const { tags } = await request<QueryTagResponse, any>(endpoint, QUERY_TAGS, {
    search: {},
  });
  return tags.data;
};
