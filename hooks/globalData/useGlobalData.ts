import { useQuery } from 'react-query';
import { getGlobalData } from '@/api/global';
import { globalDataKeys } from '@/constants/queryKeys';

const useGlobalData = () => useQuery(globalDataKeys.globalData, () => getGlobalData());

export default useGlobalData;
