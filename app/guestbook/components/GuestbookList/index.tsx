import { getAllComments } from '@/actions/comment';
import Comments from '@/components/common/Comments';
import { GUESTBOOK } from '@/constants/comment';

const GuestbookList = async () => {
  const comments = await getAllComments({ blogId: GUESTBOOK });

  return <Comments comments={comments} />;
};

export default GuestbookList;
