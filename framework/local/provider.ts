import { handler as useSearch } from '../blog/article/use-search';
import { handler as useLikeArticle } from './article/use-like-article';
import { handler as useLikeComment } from './comment/use-like-comment';
import { handler as useComment } from './comment/use-comment';
import { handler as usePostComment } from './comment/use-post-comment';
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
    usePostComment,
    useLikeComment,
  },
};

export type ItsukiBlogProvider = typeof itsukiBlogProvider;
