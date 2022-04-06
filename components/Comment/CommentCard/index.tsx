import { ReactNode } from 'react';
import Image from 'next/image';
import { ToDate } from '@/components/common';
import { MarkdownBlock } from '@/components/ui';
import { Comment } from '@/entities/comment';
import { NoReturnFunction } from '@/types/fn';
import getGravatarUrl from '@/utils/gravatar';
import markedToHtml from '@/utils/marked';

export const buildCommentDomId = (id: number) => `comment-${id}`;

interface CommentCardCommonProps {
  comment: Comment;
}

interface CommentCardProps extends CommentCardCommonProps {
  // eslint-disable-next-line react/no-unused-prop-types
  onReply?: NoReturnFunction<Comment>;
  children?: ReactNode;
  reply?: (comment: Comment) => ReactNode;
  className?: string;
}
const CommentCard = ({
  comment,
  onReply,
  reply,
  children,
  className,
}: CommentCardProps) => {
  const contentHtml = markedToHtml(comment.content, { purify: true });

  return (
    <div
      id={buildCommentDomId(comment.id)}
      key={comment.id}
      // className='relative mb-6 rounded-sm bg-[#f8f8f8] p-[18px]'
    >
      <div className={`relative mb-5 rounded-sm bg-[#f8f8f8] p-4 ${className}`}>
        <div className='float-left mr-6'>
          <Image
            src={'https://static.itsuki.cn/avatar1.jpg' || getGravatarUrl(comment.email)}
            width={52}
            height={52}
            className='rounded-full'
            alt='avatar'
          />
        </div>

        <div>
          <span
            tabIndex={0}
            role='button'
            className='float-right inline-block pr-1 text-xs text-[#999]'
            onClick={() => onReply?.(comment)}
          >
            回复
          </span>

          <span className='inline-block text-xs text-[#2d2d2d]'>{comment.nickname}</span>

          <span className='mt-1 mb-2 block flex-grow text-xxs text-[#999]'>
            <ToDate date={comment.createAt} />
          </span>
        </div>

        <MarkdownBlock
          isComments
          // className='clear-left max-h-[600px] overflow-y-scroll  pt-3 text-sm'
          className='clear-left overflow-y-scroll  pt-3 text-sm'
          htmlContent={contentHtml}
        />
      </div>

      {reply?.(comment)}

      {children}
    </div>
  );
};

export default CommentCard;
