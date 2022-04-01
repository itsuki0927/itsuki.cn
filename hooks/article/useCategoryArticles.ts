import { useQuery } from 'react-query';
import { getArticles } from '@/api/article';
import { articleKeys } from '@/constants/queryKeys';

const useCategoryArticles = (category: string) =>
  useQuery(articleKeys.category(category), () => getArticles({ category }));

export default useCategoryArticles;
