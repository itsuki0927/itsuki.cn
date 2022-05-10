import { useQuery } from 'react-query';
import { getArticles } from '@/api/article';
import { articleKeys } from '@/constants/queryKeys';

const useTagArticles = (tagPath: string) =>
  useQuery(articleKeys.tag(tagPath), () => getArticles({ tagPath }));

export default useTagArticles;
