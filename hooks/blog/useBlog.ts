import { useQuery } from '@tanstack/react-query';
import { getBlog } from '@/api/blog';
import { getBlogHeadingElementId } from '@/constants/anchor';
import { blogKeys } from '@/constants/queryKeys';
import markedToHtml from '@/libs/marked';

export interface BlogHeading {
  text: string;
  level: number;
  id: string;
}

const useBlog = (blogPath: string) =>
  useQuery(blogKeys.detail(blogPath), () => getBlog(blogPath), {
    select: data => {
      const headings: BlogHeading[] = [];
      const htmlContent = markedToHtml(data.content, {
        purify: true,
        headingIDRenderer: (_, level, raw) => {
          const id = getBlogHeadingElementId(
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
    enabled: !!blogPath,
  });

export default useBlog;
