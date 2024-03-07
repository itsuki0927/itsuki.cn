import { Comment, InsertCommentBody } from '@/types/comment';
import buildUrl from '@/utils/buildUrl';
import { useCallback, useState, useTransition } from 'react';
import { useSWRConfig } from 'swr';
import { toast } from 'sonner';

const useCreateComment = () => {
  const [isPending, startTransition] = useTransition();
  const [isFetching, setFetching] = useState(false);
  const isLoading = isFetching || isPending;
  const { mutate } = useSWRConfig();

  const insertComment = useCallback(
    async (body: InsertCommentBody) => {
      try {
        if (!body.content) {
          toast.error('☹️☹️☹️ 发送失败老 , 老铁内容呢?\n');
          return false;
        }
        setFetching(true);
        const loadingToastId = toast.loading('发送中...');
        const res = await fetch(buildUrl(`/api/comment`), {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        toast.dismiss(loadingToastId);
        console.log('insertComment data:', data);
        if (data) {
          const mutateKey = `/api/comment?blogId=${body.blogId}&section=${
            body.section ?? ''
          }`;

          const getNextData = (previousData?: Comment[]): Comment[] => {
            return (previousData ?? []).concat(data);
          };
          if (data) {
            startTransition(async () => {
              await mutate(mutateKey, getNextData, {
                revalidate: false,
              });
              toast.success('🎉🎉🎉 发送成功');
              const noLocationMutateKey = `/api/comment?blogId=${body.blogId}&location=`;
              if (mutateKey !== noLocationMutateKey) {
                // 还需要 update 一下没有location的comment数据
                mutate(noLocationMutateKey, getNextData, {
                  revalidate: false,
                });
              }
            });
            return true;
          }
        }
      } catch (err: any) {
        console.error('[Comment Error]:', err);
        toast.error('☹️☹️☹️ 发送失败:' + err.message);
      } finally {
        setFetching(false);
      }
      return false;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return { insertComment, isLoading } as const;
};

export default useCreateComment;
