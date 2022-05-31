import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { ReactNode, useRef } from 'react';
import toast, { Toast } from 'react-hot-toast';
import { ToDate } from '@/components/common';
import {
  CloseOutlined,
  CommentOutlined,
  CompassOutlined,
  LikeFilled,
  LikeOutlined,
  TimeOutlined,
} from '@/components/icons';
import ReplyOutlined from '@/components/icons/ReplyOutlined';
import { MarkdownBlock } from '@/components/ui';
import { Comment } from '@/entities/comment';
import { useMarkdown } from '@/hooks';
import useLikeComment from '@/hooks/comment/useLikeComment';
import { NoReturnFunction } from '@/types/fn';
import scrollTo from '@/utils/scrollTo';
import CommentAvatar from '../CommentAvatar';
import CommentList, { buildCommentTree, CommentTree } from '../CommentList';
import { gtag } from '@/utils/gtag';
import { GAEventCategories } from '@/constants/gtag';

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
  const { data: session } = useSession();
  const contentHtml = useMarkdown(ref, comment.content);
  const { isLike, mutation } = useLikeComment({
    articleId: Number(data.comment.articleId),
    commentId: Number(data.comment.id),
  });
  const isSignout = !session?.user;

  const buildCommentReplyToast = (t: Toast) => (
    <div
      className={classNames(
        'absolute right-0 top-20 cursor-pointer rounded-sm bg-primary px-4 py-2 transition-colors hover:bg-primary-hover',
        t.visible ? 'animate-enter' : 'animate-leave'
      )}
    >
      <p
        className='mb-0 text-center text-sm text-white'
        onClick={() => {
          const commentDom = document.getElementById(buildCommentDomId(comment.id));
          if (commentDom) {
            scrollTo(commentDom);
          }
        }}
      >
        回复 #{comment.nickname} 中
      </p>
    </div>
  );

  return (
    <div
      id={buildCommentDomId(comment.id)}
      key={comment.id}
      className={`transition-all duration-500 ${className}`}
    >
      <div className={`relative mb-2 rounded-sm bg-white-1 p-4 ${childClassName}`}>
        <header className='flex items-center'>
          <CommentAvatar avatar={comment.avatar} loginType={comment.loginType} />
          <div className='ml-4 flex-grow'>
            <div className='mb-0 flex w-full items-center justify-between text-dark-2 '>
              <span className=''>{comment.nickname}</span>

              {Number(comment.parentId) > 0 && (
                <div className='text-sm text-gray-2'>
                  回复
                  <span className='ml-1 cursor-pointer transition-colors duration-300 hover:text-dark-2 '>
                    #{comment.parentNickName}
                  </span>
                </div>
              )}
            </div>

            <div className='mt-1 flex flex-grow items-center space-x-2 text-sm text-gray-2'>
              <span className='capsize'>
                <TimeOutlined className='mr-1 align-baseline text-sm' />
                <ToDate date={comment.createAt} />
              </span>

              <span className='capsize'>
                <CompassOutlined className='mr-1 align-baseline text-sm' />
                <span className='text-sm'>
                  {comment.province}
                  <i className='mx-1'>•</i>
                  {comment.city}
                </span>
              </span>
            </div>
          </div>
        </header>

        <MarkdownBlock
          ref={ref}
          htmlContent={contentHtml}
          className='lazy clear-left my-3 max-h-[600px] overflow-y-auto'
        />

        <div className='flex justify-between text-gray-1'>
          <div className='space-x-3'>
            {!!commentChildren.length && (
              <span className='capsize inline-block cursor-pointer rounded-sm px-2 py-1 text-sm transition-colors duration-300 hover:bg-primary-light hover:text-primary  '>
                <CommentOutlined className='mr-1 align-baseline' />
                {commentChildren.length}
              </span>
            )}
            <button
              className={classNames(
                'capsize inline-block cursor-pointer rounded-sm px-3 py-1 text-sm transition-colors duration-300',
                isLike
                  ? 'bg-danger-light text-danger'
                  : 'hover:bg-danger-light hover:text-danger'
              )}
              onClick={() => {
                if (isLike) {
                  return;
                }
                gtag.event('like_comment', {
                  category: GAEventCategories.Comment,
                });
                mutation.mutateAsync();
              }}
              type='button'
            >
              {isLike ? (
                <LikeFilled className='mr-1 align-baseline' />
              ) : (
                <LikeOutlined className='mr-1 align-baseline' />
              )}
              {comment.liking}
            </button>
          </div>

          {replyId === comment.id ? (
            <button
              type='button'
              className='capsize inline-block cursor-pointer rounded-sm bg-white px-3 py-1 text-sm text-dark-2 transition-colors duration-300'
              onClick={() => {
                onCancelReply?.();
                toast.dismiss();
                gtag.event('cancel_reply_comment', {
                  category: GAEventCategories.Comment,
                });
              }}
            >
              <CloseOutlined className='mr-1 align-baseline' />
              取消回复
            </button>
          ) : (
            <button
              type='button'
              disabled={isSignout}
              className={classNames(
                'capsize inline-block rounded-sm px-3 py-1 text-sm transition-colors duration-300',
                isSignout
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer hover:bg-white hover:text-dark-2'
              )}
              onClick={() => {
                toast.dismiss();
                toast.custom(buildCommentReplyToast, {
                  duration: 3000,
                });
                gtag.event('reply_comment', {
                  category: GAEventCategories.Comment,
                });
                onReply?.(comment);
              }}
            >
              <ReplyOutlined className='mr-1' />
              回复
            </button>
          )}
        </div>
      </div>
      {reply?.(comment)}

      {!!commentChildren.length && (
        <CommentList className='ml-12 mt-4' data={buildCommentTree(commentChildren)}>
          {item => (
            <CommentCard
              key={item.comment.id}
              data={item}
              childClassName='border-l-4 border-solid border-white-2 '
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
