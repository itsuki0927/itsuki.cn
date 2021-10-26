import { handler as useSearch } from '../blog/article/use-search';
import { handler as useLikeArticle } from './article/use-like-article';
import fetcher from './fetcher';

export const itsukiBlogProvider = {
  locale: 'zh-cn',
  fetcher,
  articles: {
    useSearch,
    useLikeArticle,
  },
};

export type ItsukiBlogProvider = typeof itsukiBlogProvider;
