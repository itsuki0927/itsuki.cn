import { useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getComments } from '@/api/comment';
import { commentKeys } from '@/constants/queryKeys';
import { convertToCommentTreeData } from '@/components/comment/CommentView/utils';
import { QueryCommentsResponse } from '@/entities/comment';
import { Sort } from '@/components/ui/SortSelect';

const useComments = (blogId: number) => {
  const queryClient = useQueryClient();
  const res = useQuery(commentKeys.lists(blogId), () => getComments({ blogId }), {
    onSuccess: resData => ({
      ...resData,
      data: resData.data.map(comment => ({
        ...comment,
        emojiMap: JSON.parse(comment.emoji),
      })),
    }),
  });
  const treeData = useMemo(() => convertToCommentTreeData(res?.data?.data ?? []), [res]);

  const updateSort = (sort: Sort) => {
    queryClient.setQueryData<QueryCommentsResponse['comments']>(
      commentKeys.lists(blogId),
      oldData => {
        // 1 最新
        if (sort === Sort.Latest) {
          oldData?.data.sort(
            (a, b) => new Date(b.createAt).valueOf() - new Date(a.createAt).valueOf()
          );
          // 2 最早
        } else if (sort === Sort.Earliest) {
          oldData?.data.sort(
            (a, b) => new Date(a.createAt).valueOf() - new Date(b.createAt).valueOf()
          );
        }
        return JSON.parse(JSON.stringify(oldData));
      }
    );
  };

  return {
    ...res,
    isEmpty: res.data?.total === 0,
    treeData,
    updateSort,
  } as const;
};

export default useComments;
