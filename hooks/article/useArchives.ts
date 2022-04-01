import { useQuery } from 'react-query';
import { getArchives } from '@/api/article';
import { articleKeys } from '@/constants/queryKeys';

const useArchives = () => useQuery(articleKeys.archive(), () => getArchives());

export default useArchives;
