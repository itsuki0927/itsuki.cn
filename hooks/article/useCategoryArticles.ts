import { useQuery } from 'react-query';
import { getArticles } from '@/api/article';
import { articleKeys } from '@/constants/queryKeys';

const useCategoryArticles = (categoryPath: string) =>
  useQuery(articleKeys.category(categoryPath), () => getArticles({ categoryPath }));

export default useCategoryArticles;
