import { ReactNode, useRef } from 'react';
import { MyImage, ToDate } from '@/components/common';
import { MarkdownBlock } from '@/components/ui';
import { Comment } from '@/entities/comment';
import { NoReturnFunction } from '@/types/fn';
import { useMarkdown } from '@/hooks';
import {
  CloseOutlined,
  CommentOutlined,
  CompassOutlined,
  LikeOutlined,
  TimeOutlined,
} from '@/components/icons';
import ReplyOutlined from '@/components/icons/ReplyOutlined';
import CommentList, { buildeCommentTree, CommentTree } from '../CommentList';

export const buildCommentDomId = (id: number) => `comment-${id}`;

interface CommentCardCommonProps {
  data: CommentTree;
}

interface CommentCardProps extends CommentCardCommonProps {
  onReply?: NoReturnFunction<Comment>;
  replyId: number | null;
  reply?: (comment: Comment) => ReactNode;
  onCancelReply?: () => void;
  className?: string;
  childClassName?: string;
}

const CommentCard = ({
  data,
  onReply,
  reply,
  replyId,
  onCancelReply,
  className,
  childClassName,
}: CommentCardProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { comment, children: commentChildren } = data;
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
            width={45}
            height={45}
            imgClassName='rounded-full'
            alt='avatar'
            className='min-w-[45px]'
          />
          <div className='ml-4 flex-grow'>
            <div className='mb-0 flex w-full items-center justify-between text-dark-2 dark:text-dark-2--dark'>
              <span className=''>{comment.nickname}</span>

              {Number(comment.parentId) > 0 && (
                <div className='text-sm text-gray-2'>
                  回复
                  <span className='ml-1 cursor-pointer transition-colors duration-300 hover:text-dark-2'>
                    #{comment.parentNickName ?? '弗雷'}
                  </span>
                </div>
              )}
            </div>

            <div className='mt-1 flex flex-grow items-center text-xs text-gray-2 dark:text-gray-2--dark'>
              <span>
                <TimeOutlined className='mr-1 text-xs' />
                <ToDate date={comment.createAt} />
              </span>

              <span className='ml-2'>
                <CompassOutlined className='mr-1 text-xs' />
                <span className='text-xs'>
                  {comment.province ?? '湖南'}
                  <i className='mx-1'>•</i>
                  {comment.city ?? '娄底'}
                </span>
              </span>
            </div>
          </div>
        </header>

        <MarkdownBlock
          ref={ref}
          htmlContent={contentHtml}
          isComments
          className='lazy clear-left my-3 max-h-[600px] overflow-y-auto text-sm'
        />

        <div className='flex justify-between text-gray-1'>
          <div>
            {!!commentChildren.length && (
              <span className='mr-3 inline-block cursor-pointer rounded-sm px-2 py-1 text-xs transition-colors duration-300 hover:bg-[#E1F0FF] hover:text-[#369EFF]'>
                <CommentOutlined className='mr-1' />
                {commentChildren.length}
              </span>
            )}
            <button
              className='inline-block cursor-pointer rounded-sm px-2 py-1 text-xs transition-colors duration-300 hover:bg-[#FFE2E5] hover:text-[#F64E60]'
              type='button'
            >
              <LikeOutlined className='mr-1' />7
            </button>
          </div>

          {replyId === comment.id ? (
            <button
              type='button'
              className='inline-block cursor-pointer rounded-sm px-2 py-1 text-xs transition-colors duration-300 hover:bg-white hover:text-dark-2'
              onClick={() => onCancelReply?.()}
            >
              <CloseOutlined className='mr-1' />
              取消回复
            </button>
          ) : (
            <button
              type='button'
              className='inline-block cursor-pointer rounded-sm px-2 py-1 text-xs transition-colors duration-300 hover:bg-white hover:text-dark-2'
              onClick={() => onReply?.(comment)}
            >
              <ReplyOutlined className='mr-1' />
              回复
            </button>
          )}
        </div>
      </div>
      {reply?.(comment)}

      {!!commentChildren.length && (
        <CommentList className='ml-12 mt-4' data={buildeCommentTree(commentChildren)}>
          {item => (
            <CommentCard
              key={item.comment.id}
              data={item}
              childClassName='border-l-4 border-solid border-white-2 dark:border-white-2--dark'
              replyId={replyId}
              reply={reply}
              onReply={onReply}
              onCancelReply={onCancelReply}
            />
          )}
        </CommentList>
      )}
    </div>
  );
};

export default CommentCard;
