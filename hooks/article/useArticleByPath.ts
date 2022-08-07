import { useQuery } from 'react-query';
import { getArticleByPath } from '@/api/article';
import { getArticleHeadingElementId } from '@/constants/anchor';
import { articleKeys } from '@/constants/queryKeys';
import markedToHtml from '@/libs/marked';

export interface ArticleHeading {
  text: string;
  level: number;
  id: string;
}

const useArticleByPath = (path: string) =>
  useQuery(articleKeys.detailByPath(path), () => getArticleByPath(path), {
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
        htmlContent,
        headings,
      };
    },
    enabled: !!path,
  });

export default useArticleByPath;
