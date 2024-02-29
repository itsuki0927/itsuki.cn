import CommentCard from '@/app/guestbook/components/CommentCard';
import { Comment } from '@/types/comment';
import Empty from './Empty';

export interface CommentsProps {
  comments: Comment[];
}

export interface EmptyCommentsProps {
  className?: string;
}
export const EmptyComments = ({ className }: EmptyCommentsProps) => {
  return (
    <Empty className={className}>
      数据库里硬是一条评论都没得，期待你的想法
    </Empty>
  );
};

const Comments = ({ comments }: CommentsProps) => {
  return (
    <ul className="rounded-xl overflow-hidden">
      {comments.map((comment) => (
        <CommentCard
          className="bg-white border-b border-solid border-gray-100 last:border-none"
          key={comment.id}
          comment={comment}
        />
      ))}
    </ul>
  );
};

export default Comments;
