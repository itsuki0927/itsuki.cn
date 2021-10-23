import fetcher from './fetcher';
import { handler as useSearch } from './article/use-search';

export const itsukiBlogProvider = {
  locale: 'zh-cn',
  fetcher,
  articles: {
    useSearch,
  },
};

export type ItsukiBlogProvider = typeof itsukiBlogProvider;
