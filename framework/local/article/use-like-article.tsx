import { useCallback } from 'react';
import { initialLikeValue, LikeArticles, LikeArticlesKey } from '@/constants/like';
import { LikeArticleHook } from '@/entities/article';
import useLikeArticle, {
  UseLikeArticle,
} from '@/framework/blog/article/use-like-article';
import { MutationHook } from '@/framework/blog/utils/types';
import { useLocalStorage } from '@/hooks/index';

export default useLikeArticle as UseLikeArticle<typeof handler>;

export const handler: MutationHook<LikeArticleHook> = {
  fetchOptions: {
    url: '/api/article',
    method: 'PATCH',
  },
  useHook:
    ({ fetch }) =>
    () => {
      const [likeArticles, setLikeArticles] = useLocalStorage<LikeArticles>(
        LikeArticlesKey,
        initialLikeValue
      );
      return useCallback(
        async ({ articleId }) => {
          setLikeArticles({ ...likeArticles, [articleId]: true });
          return fetch({
            input: { articleId },
          });
        },
        [likeArticles, setLikeArticles]
      );
    },
};
