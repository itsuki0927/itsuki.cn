import request from 'graphql-request';
import { BlackList, QueryBlackListResponse } from '@/entities/blacklist';
import { endpoint } from './service';
import { QUERY_BLACK_LIST } from '@/graphqls/blacklist';

const strToStringArray = (val: any) => (JSON.parse(val ?? undefined) ?? []) as string[];

export const getBlackList = async () => {
  const { blacklist } = await request<QueryBlackListResponse, void>(
    endpoint,
    QUERY_BLACK_LIST
  );
  return {
    blacklist: {
      ip: strToStringArray(blacklist.ip),
      keyword: strToStringArray(blacklist.keyword),
      email: strToStringArray(blacklist.email),
    } as BlackList,
  };
};
