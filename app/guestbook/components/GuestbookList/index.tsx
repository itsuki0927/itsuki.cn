import { GUESTBOOK } from '@/constants/comment';
import { auth } from '@/libs/auth';
import { MessageSquarePlus } from 'lucide-react';
import { SessionProvider } from 'next-auth/react';
import CommentCard from '../CommentCard';
import { Comment } from '@/types/comment';
import { getComments } from '@/actions/comment';

const GuestbookList = async () => {
  const session = await auth();
  const res = await getComments(GUESTBOOK);

  let comments: Comment[] = [];
  try {
    if (res.data) {
      comments = res.data;
    }
  } catch (err) {
    console.error('[GuestbookList] getComments error:', err);
  }

  return (
    <SessionProvider session={session}>
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
    </SessionProvider>
  );
};

export default GuestbookList;
