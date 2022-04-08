import { Comment } from '@/entities/comment';
import { EmptyFunction } from '@/types/fn';

type CommentReplyProps = {
  isReply?: boolean;
  comment?: Comment;
  onCloseReply?: EmptyFunction;
};

const CommentReply = ({ comment, onCloseReply, isReply }: CommentReplyProps) =>
  isReply ? (
    <h3 className='my-2 font-medium tracking-wider text-dark-2'>
      回复 {comment?.nickname}
      <small
        tabIndex={0}
        role='button'
        onClick={onCloseReply}
        className='float-right cursor-pointer text-xs font-normal text-gray-2 transition-colors hover:text-dark-2'
      >
        取消回复
      </small>
    </h3>
  ) : null;

export default CommentReply;
