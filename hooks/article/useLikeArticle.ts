import toast from 'react-hot-toast';
import { GraphQLError } from 'graphql';
import { useMutation, useQueryClient } from 'react-query';
import { likeArticle } from '@/api/article';
import { initialLikeValue, LikeArticles, LikeArticlesKey } from '@/constants/like';
import { articleKeys } from '@/constants/queryKeys';
import { Article, LikeArticleBody, LikeArticleResponse } from '@/entities/article';
import { useLocalStorage } from '..';
import { GAEventCategories } from '@/constants/gtag';
import { gtag } from '@/utils/gtag';

export const LIKE_NUMBER_MAX = 50;

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
  const detailKey = articleKeys.detail(articlePath);
  const mutation = useMutation<
    LikeArticleResponse,
    GraphQLError,
    Pick<LikeArticleBody, 'count'>
  >(({ count }) => likeArticle({ id: articleId, count }), {
    onMutate: async ({ count }) => {
      await queryClient.cancelQueries(detailKey);

      const previousBlog = queryClient.getQueryData(detailKey);

      queryClient.setQueryData<Article | undefined>(
        articleKeys.detail(articlePath),
        oldArticle => {
          if (!oldArticle) return undefined;
          return {
            ...oldArticle,
            liking: oldArticle.liking + count,
            originLiking: oldArticle.liking,
          };
        }
      );

      return { previousBlog };
    },
    onError: (err, _, context: any) => {
      queryClient.setQueryData(detailKey, context?.previousBlog);
    },
    onSettled: () => {
      queryClient.invalidateQueries(detailKey);
    },
    onSuccess: (_, { count }) => {
      toast.success('感谢你对我的鼓励!!!');
      gtag.event('like_article', {
        category: GAEventCategories.Article,
        /* label: article.title, */
      });
      setLikeArticles(oldLikeArticles => ({
        ...oldLikeArticles,
        [articleId]: (oldLikeArticles[articleId] || 0) + count,
      }));
    },
  });

  return {
    allowLike: (likeArticles[articleId] ?? 0) < LIKE_NUMBER_MAX,
    mutation,
  } as const;
};

export default useLikeArticle;
