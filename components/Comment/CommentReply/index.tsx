import { Comment } from '@/entities/comment';
import { EmptyFunction } from '@/types/fn';

type CommentReplyProps = {
  isReply?: boolean;
  comment?: Comment;
  onCloseReply?: EmptyFunction;
};

const CommentReply = ({ comment, onCloseReply, isReply }: CommentReplyProps) =>
  isReply ? (
    <div className='my-2 flex items-center justify-between'>
      <h3 className='max-w-xs break-words font-medium  tracking-wider text-dark-2 line-clamp-1 dark:text-dark-2--dark'>
        回复 {comment?.nickname}
      </h3>
      <small
        tabIndex={0}
        role='button'
        onClick={onCloseReply}
        className='cursor-pointer text-xs font-normal text-gray-2 transition-colors hover:text-dark-2 dark:text-gray-2--dark hover:dark:text-dark-2--dark'
      >
        取消回复
      </small>
    </div>
  ) : null;

export default CommentReply;
