import { useQuery } from 'react-query';
import { getArticle } from '@/api/article';
import markedToHtml from '@/utils/marked';

const useArticle = (articleId: number) =>
  useQuery(['article', articleId], () => getArticle(articleId), {
    select: data => ({
      ...data,
      content: markedToHtml(data.content),
    }),
  });

export default useArticle;
