import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { GAEventCategories } from '@/constants/gtag';
import { PostCommentBody } from '@/entities/comment';
import { gtag } from '@/utils/gtag';
import { useAuth } from '@/libs/auth';

const useCreateComment = (blogId: number) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const { user } = useAuth();

  const postComment = useCallback(
    async (params: PostCommentBody) => {
      gtag.event('push_comment', {
        category: GAEventCategories.Comment,
        label: `blog_id: ${blogId}`,
      });
      setLoading(true);
      console.log('send api comment');
      return toast
        .promise(
          fetch('/api/comment', {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: user?.token ?? '',
            },
            method: 'post',
            body: JSON.stringify(params),
          }),
          {
            loading: '发射中...',
            success: <b>👏 发射成功</b>,
            error: <b>🙌 发射失败</b>,
          }
        )
        .then(
          async () => {
            router.refresh();
            return true;
          },
          () => false
        )
        .finally(() => {
          setLoading(false);
        });
    },
    [blogId, router, user]
  );

  return { postComment, isLoading } as const;
};

export default useCreateComment;
