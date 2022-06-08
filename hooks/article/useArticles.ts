import { useQuery } from 'react-query';
import { getArticles } from '@/api/article';
import { articleKeys } from '@/constants/queryKeys';

const useArticles = () => useQuery([...articleKeys.lists()], () => getArticles());

export type UseArticles = ReturnType<typeof useArticles>;

export default useArticles;
