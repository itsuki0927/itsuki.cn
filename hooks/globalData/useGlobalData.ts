import { useQuery } from 'react-query';
import { getGlobalData } from '@/api/global';

const useGlobalData = () => useQuery('globalData', () => getGlobalData());

export default useGlobalData;
