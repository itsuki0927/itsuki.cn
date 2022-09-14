import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { getComments } from '@/api/comment';
import { commentKeys } from '@/constants/queryKeys';
import { convertToCommentTreeData } from '@/components/comment/CommentView/utils';

const useComments = (articleId: number) => {
  const res = useQuery(commentKeys.lists(articleId), () => getComments(articleId));
  const treeData = useMemo(
    () => convertToCommentTreeData(res?.data?.data ?? []),
    [res.data]
  );

  return {
    ...res,
    isEmpty: res.data?.total === 0,
    treeData,
  } as const;
};

export default useComments;
