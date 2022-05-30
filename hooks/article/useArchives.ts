import { useQuery } from 'react-query';
import { getArchives } from '@/api/article';
import { articleKeys } from '@/constants/queryKeys';
import { Article, ArticleArchive, ArticleArchiveResponse } from '@/entities/article';

const convertToArchiveData = (data: Article[]) => {
  const result: ArticleArchiveResponse = new Map();

  data.forEach(article => {
    const createAt = new Date(article.createAt);
    const year = `${createAt.getFullYear()}`;
    const articles: ArticleArchive[] = result.get(year) ?? [];
    result.set(year, articles.concat(article));
  });

  return result;
};

const useArchives = () =>
  useQuery(articleKeys.archive(), () => getArchives(), {
    select: ({ data }) => convertToArchiveData(data),
  });

export default useArchives;
