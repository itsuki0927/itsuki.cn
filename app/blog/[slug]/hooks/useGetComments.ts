import { Comment } from '@/types/comment';
import useSWR from 'swr';
// import convertCommentData, { CommentTree } from '../utils/convertToTreeData';

interface UseCommentsOptions {
  blogId: number;
  section?: string;
}

const useGetComments = ({ blogId, section = '' }: UseCommentsOptions) => {
  return useSWR<Comment[]>(
    `/api/comment?blogId=${blogId}&section=${section}`,
    async (url: string) => {
      const response = await fetch(url).then((res) => res.json());
      return response;
    },
    {
      revalidateOnFocus: false,
    },
  );
};

export default useGetComments;
