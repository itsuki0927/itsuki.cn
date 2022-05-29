import { useQuery } from 'react-query';
import { getArticle } from '@/api/article';
import markedToHtml from '@/libs/marked';
import { articleKeys } from '@/constants/queryKeys';
import { getArticleHeadingElementId } from '@/constants/anchor';

export interface ArticleHeading {
  text: string;
  level: number;
  id: string;
}

const useArticle = (articleId: number) =>
  useQuery(articleKeys.detail(articleId), () => getArticle(articleId), {
    select: data => {
      const headings: ArticleHeading[] = [];
      const htmlContent = markedToHtml(data.content, {
        purify: true,
        headingIDRenderer: (_, level, raw) => {
          const id = getArticleHeadingElementId(
            level,
            raw.toLowerCase().replace(/[^a-zA-Z0-9\u4E00-\u9FA5]+/g, '-')
          );
          headings.push({ level, id, text: raw });
          return id;
        },
      });
      return {
        ...data,
        id: articleId,
        content: htmlContent,
        headings,
      };
    },
    enabled: !!articleId,
  });

export default useArticle;
