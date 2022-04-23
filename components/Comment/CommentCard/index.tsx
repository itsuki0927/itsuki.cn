import { ReactNode, useRef } from 'react';
import { MyImage, ToDate } from '@/components/common';
import { MarkdownBlock } from '@/components/ui';
import { Comment } from '@/entities/comment';
import { NoReturnFunction } from '@/types/fn';
import { useMarkdown } from '@/hooks';

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
  const ref = useRef<HTMLDivElement | null>(null);
  const contentHtml = useMarkdown(ref, comment.content);

  return (
    <div
      id={buildCommentDomId(comment.id)}
      key={comment.id}
      className={`transition-all duration-500 ${className}`}
    >
      <div
        className={`relative mb-2 rounded-sm bg-white-1 p-4 dark:bg-white-1--dark ${childClassName}`}
      >
        <header className='flex items-center'>
          <MyImage
            src='https://static.itsuki.cn/avatar.jpg'
            width={52}
            height={52}
            imgClassName='rounded-full'
            alt='avatar'
            className='min-w-[52px]'
          />
          <div className='ml-4 flex-grow'>
            <span
              tabIndex={0}
              role='button'
              className='float-right inline-block pr-1 text-xs text-gray-2 transition-colors duration-200 hover:text-dark-2 dark:text-gray-2--dark hover:dark:text-dark-2--dark'
              onClick={() => onReply?.(comment)}
            >
              回复
            </span>

            <span className='max-w-xs break-words text-xs text-dark-2 line-clamp-1 dark:text-dark-2--dark'>
              {comment.nickname}
            </span>

            <span className='mt-1 mb-2 block flex-grow text-xxs text-gray-2 dark:text-gray-2--dark'>
              <ToDate date={comment.createAt} />
            </span>
          </div>
        </header>

        <MarkdownBlock
          ref={ref}
          htmlContent={contentHtml}
          isComments
          className='lazy clear-left mt-3 max-h-[600px] overflow-y-auto text-sm'
        />
      </div>

      {reply?.(comment)}

      {children}
    </div>
  );
};

export default CommentCard;
