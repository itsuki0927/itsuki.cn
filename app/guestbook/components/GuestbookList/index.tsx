import { getComments } from '@/actions/comment';
import { GUESTBOOK } from '@/constants/comment';
import { auth } from '@/libs/auth';
import { SessionProvider } from 'next-auth/react';
import CommentCard from '../CommentCard';

const GuestbookList = async () => {
  const session = await auth();
  const data = await getComments(GUESTBOOK);
  return (
    <SessionProvider session={session}>
      <ul className="rounded-lg overflow-hidden">
        {data?.map((comment) => (
          <CommentCard
            className="bg-white border-b border-solid border-gray-100"
            key={comment.id}
            comment={comment}
          />
        ))}
      </ul>
    </SessionProvider>
  );
};

export default GuestbookList;
