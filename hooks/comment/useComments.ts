import { useQuery } from 'react-query';
import { getComments } from '@/api/comment';
import { commentKeys } from '@/constants/queryKeys';
import markedToHtml from '@/utils/marked';

const useComments = (articleId: number) => {
  const res = useQuery(commentKeys.lists(articleId), () => getComments(articleId), {
    select: (comments = []) =>
      comments.map(item => ({
        ...item,
        content: markedToHtml(item.content, { purify: true }),
      })),
  });

  return {
    ...res,
    isEmpty: res.data?.length === 0,
  };
};

export default useComments;
