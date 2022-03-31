import { useQuery } from 'react-query';
import { getPublishArticles } from '@/api/article';

const usePublishArticles = () => useQuery('publishArticles', () => getPublishArticles());

export default usePublishArticles;
