import { useQuery } from 'react-query';
import { getGlobalData } from '@/api/global';
import { globalDataKeys } from '@/constants/queryKeys';

const useGlobalData = () =>
  useQuery(globalDataKeys.globalData, () => getGlobalData(), {
    select: ({ blacklist, ...rest }) => ({
      ...rest,
      blacklist: {
        ...blacklist,
        ip: JSON.parse(blacklist.ip as unknown as string) as string[],
        keyword: JSON.parse(blacklist.keyword as unknown as string) as string[],
        email: JSON.parse(blacklist.email as unknown as string) as string[],
      },
    }),
  });

export default useGlobalData;
