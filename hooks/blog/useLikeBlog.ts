import toast from 'react-hot-toast';
import { GraphQLError } from 'graphql';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likeBlog } from '@/api/blog';
import { initialLikeValue, LikeBlogs, LikeBlogsKey } from '@/constants/like';
import { blogKeys } from '@/constants/queryKeys';
import { Blog, LikeBlogBody, LikeBlogResponse } from '@/entities/blog';
import { useLocalStorage } from '..';
import { GAEventCategories } from '@/constants/gtag';
import { gtag } from '@/utils/gtag';

export const LIKE_NUMBER_MAX = 50;

interface UseLikeBlogParams {
  blogId: number;
  blogPath: string;
}

const useLikeBlog = ({ blogId, blogPath }: UseLikeBlogParams) => {
  const queryClient = useQueryClient();
  const [likeBlogs, setLikeBlogs] = useLocalStorage<LikeBlogs>(
    LikeBlogsKey,
    initialLikeValue
  );
  const detailKey = blogKeys.detail(blogPath);
  const mutation = useMutation<
    LikeBlogResponse,
    GraphQLError,
    Pick<LikeBlogBody, 'count'>
  >(({ count }) => likeBlog({ id: blogId, count }), {
    onMutate: async ({ count }) => {
      await queryClient.cancelQueries(detailKey);

      const previousBlog = queryClient.getQueryData(detailKey);

      queryClient.setQueryData<Blog | undefined>(blogKeys.detail(blogPath), oldBlog => {
        if (!oldBlog) return undefined;
        return {
          ...oldBlog,
          liking: oldBlog.liking + count,
        };
      });
      setLikeBlogs(oldLikeBlogs => ({
        ...oldLikeBlogs,
        [blogId]: (oldLikeBlogs[blogId] ?? 0) + count,
      }));

      return { previousBlog, count };
    },
    onError: (err, _, context: any) => {
      queryClient.setQueryData(detailKey, context?.previousBlog);
      setLikeBlogs(oldLikeBlogs => ({
        ...oldLikeBlogs,
        [blogId]: Math.min((oldLikeBlogs[blogId] ?? 0) - context.count ?? 0, 0),
      }));
    },
    onSettled: () => {
      queryClient.invalidateQueries(detailKey);
    },
    onSuccess: (_, { count }) => {
      toast.success('感谢你对我的鼓励!!!');
      gtag.event('like_blog', {
        category: GAEventCategories.Blog,
        /* label: blog.title, */
      });
      setLikeBlogs(oldLikeBlogs => ({
        ...oldLikeBlogs,
        [blogId]: (oldLikeBlogs[blogId] ?? 0) + count,
      }));
    },
  });

  return {
    liking: likeBlogs[blogId] ?? 0,
    mutation,
  } as const;
};

export default useLikeBlog;
