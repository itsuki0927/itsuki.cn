import CommentCard from '@/app/guestbook/components/CommentCard';
import { Comment } from '@/types/comment';
import { MessageSquarePlus } from 'lucide-react';

export interface CommentsProps {
  comments: Comment[];
}

const Comments = ({ comments }: CommentsProps) => {
  return (
    <>
      {!comments || comments?.length === 0 ? (
        <div className="bg-white p-4 py-8 rounded-xl border border-solid border-zinc-100">
          <MessageSquarePlus size={24} />
          <div className="mt-2 text-zinc-800 font-medium">
            数据库里硬是一条评论都没得，期待你的想法
          </div>
        </div>
      ) : (
        <ul className="rounded-xl overflow-hidden">
          {comments?.map((comment) => (
            <CommentCard
              className="bg-white border-b border-solid border-gray-100 last:border-none"
              key={comment.id}
              comment={comment}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default Comments;
