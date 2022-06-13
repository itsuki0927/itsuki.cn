import request from 'graphql-request';
import { QueryBlackListResponse } from '@/entities/blacklist';
import { endpoint } from './service';
import { QUERY_BLACK_LIST } from '@/graphqls/blacklist';

export const getBlackList = async () => {
  const { blacklist } = await request<QueryBlackListResponse, void>(
    endpoint,
    QUERY_BLACK_LIST
  );
  return blacklist;
};
