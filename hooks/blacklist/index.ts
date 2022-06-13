import { useQuery } from 'react-query';
import { blacklistKeys } from '@/constants/queryKeys';
import { getBlackList } from '@/api/blacklist';

const strToStringArray = (val: any) => (JSON.parse(val ?? undefined) ?? []) as string[];

const useBlackList = () =>
  useQuery([...blacklistKeys.list], () => getBlackList(), {
    select: data => ({
      ...data,
      ip: strToStringArray(data.ip),
      keyword: strToStringArray(data.keyword),
      email: strToStringArray(data.email),
    }),
  });

export default useBlackList;
