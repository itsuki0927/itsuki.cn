import { useQuery } from 'react-query';
import { getArchives } from '@/api/article';
import { articleKeys } from '@/constants/queryKeys';
import { Article, ArticleArchiveMap, ArticleArchiveResponse } from '@/entities/article';

const convertToArchiveData = (data: Article[]) => {
  const result: ArticleArchiveResponse = new Map();

  data.forEach(article => {
    const createAt = new Date(article.createAt);
    const year = `${createAt.getFullYear()}`;
    const month = String(createAt.getMonth() + 1).padStart(2, '0');
    const monthString = `${month}月`;

    const yearMap: ArticleArchiveMap = result.get(year) ?? new Map();
    const list = yearMap.get(monthString) ?? [];
    yearMap.set(monthString, list.concat(article));
    result.set(year, yearMap);
  });

  return result;
};

const useArchives = () =>
  useQuery(articleKeys.archive(), () => getArchives(), {
    select: ({ data }) => convertToArchiveData(data),
  });

export default useArchives;
