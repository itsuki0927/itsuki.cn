import { GUESTBOOK } from '@/constants/comment';
import { MessageSquarePlus } from 'lucide-react';
import CommentCard from '../CommentCard';
import { getAllComments } from '@/actions/comment';

const GuestbookList = async () => {
  const comments = await getAllComments({ blogId: GUESTBOOK });

  return (
    <>
      {!comments || comments?.length === 0 ? (
        <div className="bg-white p-4 rounded-xl border border-solid border-zinc-100">
          <MessageSquarePlus size={24} />
          <div className="mt-2 text-zinc-800 font-medium">
            数据库里硬是一条评论都没得，期待你的想法
          </div>
          <div className="mt-1 text-sm text-zinc-400">
            良言一句三冬暖，恶语伤人六月寒（请友善发言)
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

export default GuestbookList;
