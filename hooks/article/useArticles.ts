import { useQuery } from 'react-query';
import { getArticles } from '@/api/article';
import { DEFAULT_CURRENT, DEFAULT_PAGE_SIZE } from '@/constants/pagination';
import { articleKeys } from '@/constants/queryKeys';
import { SearchResponse } from '@/types/response';
import { Article } from '@/entities/article';

const useArticles = (current: number) =>
  useQuery(
    [...articleKeys.lists(), current],
    () => getArticles({ current, pageSize: DEFAULT_PAGE_SIZE }),
    {
      keepPreviousData: true,
      select: data => {
        const totalPage = Math.ceil(data.total / DEFAULT_PAGE_SIZE);
        const hasNext = current < totalPage;
        const hasPrev = current > DEFAULT_CURRENT;
        return { ...data, hasNext, hasPrev } as SearchResponse<Article>;
      },
    }
  );

export type UseArticles = ReturnType<typeof useArticles>;

export default useArticles;
