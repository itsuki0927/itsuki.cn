import { useQuery } from 'react-query';
import { getArticles } from '@/api/article';

const useArticles = () => useQuery('article', () => getArticles());

export default useArticles;
