import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
// import { createComment } from '@/api/comment';
import { GAEventCategories } from '@/constants/gtag';
import { PostCommentBody } from '@/entities/comment';
import { gtag } from '@/utils/gtag';
import { getBlackList } from '@/api/blacklist';
import { useAuth } from '@/libs/auth';

const useCreateComment = (blogId: number) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const { user } = useAuth();

  const ensureCommentCanPush = useCallback(
    async ({ content, email }: PostCommentBody) => {
      const { blacklist } = await getBlackList();
      const sensitiveKeyword = blacklist?.keyword.find(k => content.includes(k));
      if (sensitiveKeyword) {
        toast.error(`老铁, 评论内容有敏感词: ${sensitiveKeyword}\n`, {
          duration: 2500,
        });
        return false;
      }
      if (blacklist?.email.includes(email)) {
        toast.error(`老铁, 做了坏事情, 被拉黑了\n`, {
          duration: 2500,
        });
        return false;
      }
      if (!content) {
        toast.error(`老铁, 内容呢?\n`);
        return false;
      }
      return true;
    },
    []
  );

  const postComment = useCallback(
    async (params: PostCommentBody) => {
      if (!params.email) {
        toast.loading('请先登陆...');
        return false;
      }
      gtag.event('push_comment', {
        category: GAEventCategories.Comment,
        label: `blog_id: ${blogId}`,
      });
      const result = await ensureCommentCanPush(params);
      if (result) {
        setLoading(true);
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
            () => {
              router.refresh();
              return true;
            },
            () => false
          )
          .finally(() => {
            setLoading(false);
          });
        /* return toast */
        /*   .promise(createComment(params), { */
        /*     loading: '发射中...', */
        /*     success: <b>👏 发射成功</b>, */
        /*     error: <b>🙌 发射失败</b>, */
        /*   }) */
        /*   .then( */
        /*     () => { */
        /*       router.refresh(); */
        /*       return true; */
        /*     }, */
        /*     () => false */
        /*   ) */
        /*   .finally(() => { */
        /*     setLoading(false); */
        /*   }); */
      }
      return false;
    },
    [blogId, ensureCommentCanPush, router, user]
  );

  return { postComment, isLoading } as const;
};

export default useCreateComment;
