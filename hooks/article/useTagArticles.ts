import { useQuery } from 'react-query';
import { getArticles } from '@/api/article';
import { articleKeys } from '@/constants/queryKeys';

const useTagArticles = (tag: string) =>
  useQuery(articleKeys.tag(tag), () => getArticles({ tag }));

export default useTagArticles;
