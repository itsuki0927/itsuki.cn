import { handler as useSearch } from '../blog/article/use-search';
import { handler as useLikeArticle } from './article/use-like-article';
import { handler as useLikeComment } from './comment/use-like-comment';
import { handler as useComment } from './comment/use-comment';
import fetcher from './fetcher';

export const itsukiBlogProvider = {
  locale: 'zh-cn',
  fetcher,
  article: {
    useSearch,
    useLikeArticle,
  },
  comment: {
    useComment,
    useLikeComment,
  },
};

export type ItsukiBlogProvider = typeof itsukiBlogProvider;
