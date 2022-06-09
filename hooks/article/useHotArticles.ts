import { useQuery } from 'react-query';
import { getHotArticles } from '@/api/article';
import { articleKeys } from '@/constants/queryKeys';

const useHotArticles = () => useQuery([...articleKeys.banner()], () => getHotArticles());

export default useHotArticles;
