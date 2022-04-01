import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { likeArticle } from '@/api/article';
import { initialLikeValue, LikeArticles, LikeArticlesKey } from '@/constants/like';
import { articleKeys } from '@/constants/queryKeys';
import { Article } from '@/entities/article';
import { useLocalStorage } from '..';

const useLikeArticle = (articleId: number) => {
  const queryClient = useQueryClient();
  const [likeArticles, setLikeArticles] = useLocalStorage<LikeArticles>(
    LikeArticlesKey,
    initialLikeValue
  );
  const mutation = useMutation<number, AxiosError, void>(() => likeArticle(articleId), {
    onSuccess: liking => {
      setLikeArticles({ ...likeArticles, [articleId]: true });
      queryClient.setQueryData<Article | undefined>(
        articleKeys.detail(articleId),
        oldArticle => {
          if (!oldArticle) return undefined;
          return {
            ...oldArticle,
            liking,
          };
        }
      );
    },
  });

  return { isLike: !!likeArticles[articleId], mutation } as const;
};

export default useLikeArticle;
