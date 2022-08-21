import { GraphQLError } from 'graphql';
import { useMutation, useQueryClient } from 'react-query';
import { likeArticle } from '@/api/article';
import { initialLikeValue, LikeArticles, LikeArticlesKey } from '@/constants/like';
import { articleKeys } from '@/constants/queryKeys';
import { Article, LikeArticleResponse } from '@/entities/article';
import { useLocalStorage } from '..';

interface UseLikeArticleParams {
  articleId: number;
  articlePath: string;
}
const useLikeArticle = ({ articleId, articlePath }: UseLikeArticleParams) => {
  const queryClient = useQueryClient();
  const [likeArticles, setLikeArticles] = useLocalStorage<LikeArticles>(
    LikeArticlesKey,
    initialLikeValue
  );
  const mutation = useMutation<LikeArticleResponse, GraphQLError, void>(
    () => likeArticle(articleId),
    {
      onSuccess: ({ likeArticle: liking }) => {
        setLikeArticles({ ...likeArticles, [articleId]: true });
        queryClient.setQueryData<Article | undefined>(
          articleKeys.detail(articlePath),
          oldArticle => {
            if (!oldArticle) return undefined;
            return {
              ...oldArticle,
              liking,
            };
          }
        );
      },
    }
  );

  return { isLike: !!likeArticles[articleId], mutation } as const;
};

export default useLikeArticle;
