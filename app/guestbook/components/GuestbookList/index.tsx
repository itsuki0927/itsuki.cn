import { getAllComments } from '@/actions/comment';
import Comments, { EmptyComments } from '@/components/common/Comments';
import { GUESTBOOK } from '@/constants/comment';

const GuestbookList = async () => {
  const comments = await getAllComments({ blogId: GUESTBOOK });

  return comments?.length ? (
    <Comments comments={comments} />
  ) : (
    <EmptyComments className="rounded-xl border border-solid border-zinc-100" />
  );
};

export default GuestbookList;
