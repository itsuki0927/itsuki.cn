import { useToast } from '@/components/ui/use-toast';
import { Comment, InsertCommentBody } from '@/types/comment';
import buildUrl from '@/utils/buildUrl';
import { useCallback, useState, useTransition } from 'react';
import { useSWRConfig } from 'swr';

const useCreateComment = () => {
  const [isPending, startTransition] = useTransition();
  const [isFetching, setFetching] = useState(false);
  const isLoading = isFetching || isPending;
  const { mutate } = useSWRConfig();
  const { toast } = useToast();

  const insertComment = useCallback(
    async (body: InsertCommentBody) => {
      try {
        if (!body.content) {
          toast({ title: '☹️☹️☹️ 发送失败', description: '老铁, 内容呢?\n' });
          return false;
        }
        setFetching(true);
        const res = await fetch(buildUrl(`/api/comment`), {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
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
              toast({ title: '🎉🎉🎉 发送成功', duration: 2000 });
              // toast.success(<b>👏 发射成功</b>);
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
        toast({
          title: '☹️☹️☹️ 发送失败',
          description: err.message,
        });
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
