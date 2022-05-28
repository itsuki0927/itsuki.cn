import { useQuery } from 'react-query';
import { getArticle } from '@/api/article';
import markedToHtml from '@/libs/marked';
import { articleKeys } from '@/constants/queryKeys';

const useArticle = (articleId: number) =>
  useQuery(articleKeys.detail(articleId), () => getArticle(articleId), {
    select: data => ({
      ...data,
      id: articleId,
      content: markedToHtml(data.content),
    }),
    enabled: !!articleId,
  });

export default useArticle;
