import { QueryList, QueryListProps } from '@/components/common';
import { Comment } from '@/entities/comment';
import CommentCard from '../CommentCard';
import CommentSkeleton from '../CommentSkeleton';

type CommentListProps = Omit<QueryListProps<Comment[]>, 'children'> & {
  onReply: (reply: Comment) => void;
};

const CommentList = ({ onReply, ...comments }: CommentListProps) => (
  <QueryList
    {...comments}
    loadingContent={<CommentSkeleton />}
    className='space-y-4 bg-white p-4'
  >
    {comment => <CommentCard comment={comment} key={comment.id} onReply={onReply} />}
  </QueryList>
);

export default CommentList;
