import { useQuery } from '@tanstack/react-query';
import { getBlackList } from '@/api/blacklist';
import { blacklistKeys } from '@/constants/queryKeys';

const useBlackList = () =>
  useQuery([...blacklistKeys.list], () => getBlackList(), {
    select: data => ({ ...data }),
  });

export default useBlackList;
