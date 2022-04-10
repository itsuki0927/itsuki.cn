import { ReactNode } from 'react';
import { MyImage, ToDate } from '@/components/common';
import { MarkdownBlock } from '@/components/ui';
import { Comment } from '@/entities/comment';
import { NoReturnFunction } from '@/types/fn';
import markedToHtml from '@/utils/marked';

export const buildCommentDomId = (id: number) => `comment-${id}`;

interface CommentCardCommonProps {
  comment: Comment;
}

interface CommentCardProps extends CommentCardCommonProps {
  onReply?: NoReturnFunction<Comment>;
  children?: ReactNode;
  reply?: (comment: Comment) => ReactNode;
  className?: string;
  childClassName?: string;
}
const CommentCard = ({
  comment,
  onReply,
  reply,
  children,
  className,
  childClassName,
}: CommentCardProps) => {
  const contentHtml = markedToHtml(comment.content, { purify: true });

  return (
    <div
      id={buildCommentDomId(comment.id)}
      key={comment.id}
      className={`transition-all duration-500 ${className}`}
    >
      <div
        className={`relative mb-2 rounded-sm bg-white-1 p-4 dark:bg-white-1--dark ${childClassName}`}
      >
        <header className='clear-both'>
          <div className='float-left mr-6'>
            <MyImage
              src='https://static.itsuki.cn/avatar.jpg'
              width={52}
              height={52}
              imgClassName='rounded-full'
              alt='avatar'
            />
          </div>
          <span
            tabIndex={0}
            role='button'
            className='float-right inline-block pr-1 text-xs text-gray-2 transition-colors duration-200 hover:text-dark-2 dark:text-gray-2--dark hover:dark:text-dark-2--dark'
            onClick={() => onReply?.(comment)}
          >
            回复
          </span>

          <span className='inline-block text-xs text-dark-2 dark:text-dark-2--dark'>
            {comment.nickname}
          </span>

          <span className='mt-1 mb-2 block flex-grow text-xxs text-gray-2 dark:text-gray-2--dark'>
            <ToDate date={comment.createAt} />
          </span>
        </header>

        <MarkdownBlock
          isComments
          className='clear-left max-h-[600px] overflow-y-scroll pt-3 text-sm'
          htmlContent={contentHtml}
        />
      </div>

      {reply?.(comment)}

      {children}
    </div>
  );
};

export default CommentCard;
