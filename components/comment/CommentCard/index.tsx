import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Key, ReactNode, useRef } from 'react';
import toast, { Toast } from 'react-hot-toast';
import { ToDate, CountDown } from '@/components/common';
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
import { GAEventCategories } from '@/constants/gtag';
import { useMarkdown, useScrollTo } from '@/hooks';
import useLikeComment from '@/hooks/comment/useLikeComment';
import { gtag } from '@/utils/gtag';
import { isAdminEmail } from '@/utils/validate';
import CommentAvatar from '../CommentAvatar';
import { CommentTree } from '../CommentList';
import { useReply } from '../context';
import { getCommentElementId } from '@/constants/anchor';

const buildCommentElementId = (id: Key) => `#${getCommentElementId(id)}`;

interface CommentCardCommonProps {
  data: CommentTree;
}

interface CommentCardProps extends CommentCardCommonProps {
  className?: string;
  childClassName?: string;
  children?: ReactNode;
}

const CommentCard = ({ data, children, className, childClassName }: CommentCardProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { comment, children: commentChildren } = data;
  const { data: session } = useSession();
  const contentHtml = useMarkdown(ref, comment.content);
  const { isLike, mutation } = useLikeComment({
    articleId: Number(data.comment.articleId),
    commentId: Number(data.comment.id),
  });
  const isSignout = !session?.user;
  const { setReply, cancelReply, reply } = useReply();
  const { scrollTo } = useScrollTo();

  const handleScroll = (id: number) => {
    scrollTo(buildCommentElementId(id));
  };

  const buildCommentReplyToast = (t: Toast) => (
    <div
      className={classNames(
        'absolute right-0 top-20 cursor-pointer rounded-sm bg-primary px-4 py-2 transition-colors hover:bg-primary-hover',
        t.visible ? 'animate-enter' : 'animate-leave'
      )}
    >
      <p
        className='mb-0 text-center text-sm text-white'
        onClick={() => handleScroll(comment.id)}
      >
        回复 #{comment.nickname} 中
      </p>
    </div>
  );

  const handleLike = () => {
    if (isLike) {
      return;
    }
    gtag.event('like_comment', {
      category: GAEventCategories.Comment,
    });
    mutation.mutateAsync();
  };

  const handleCancelReply = () => {
    cancelReply();
    toast.dismiss();
    gtag.event('cancel_reply_comment', {
      category: GAEventCategories.Comment,
    });
  };

  const handleReply = () => {
    toast.dismiss();
    toast.custom(buildCommentReplyToast, {
      duration: 3000,
    });
    gtag.event('reply_comment', {
      category: GAEventCategories.Comment,
    });
    setReply(comment);
  };

  return (
    <div
      id={getCommentElementId(comment.id)}
      key={comment.id}
      className={`transition-all duration-500 ${className}`}
    >
      <div className={`relative rounded-sm bg-white-1 p-3 ${childClassName}`}>
        <header className='flex items-center'>
          <CommentAvatar avatar={comment.avatar} loginType={comment.loginType} />
          <div className='ml-3 flex-grow'>
            <div className='mb-0 flex w-full items-center justify-between text-dark-2 '>
              <p className='flex max-w-[80%] items-center'>
                <span className='capsize line-clamp-1'>{comment.nickname}</span>
                {isAdminEmail(comment.email) && (
                  <Link href='/about'>
                    <small className='ml-1 cursor-pointer rounded-sm bg-primary px-1 py-[2px] text-xxs text-white opacity-70 transition-opacity hover:opacity-100'>
                      博主
                    </small>
                  </Link>
                )}
              </p>

              {!!Number(comment.parentId) && (
                <span
                  aria-label='parent comment'
                  tabIndex={0}
                  role='button'
                  onClick={() => handleScroll(comment.parentId)}
                  className='cursor-pointer text-sm text-gray-2 transition-colors duration-300 hover:text-dark-2 '
                >
                  @{comment.parentNickName}
                </span>
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

        <div className='flex justify-between text-gray-2'>
          <div className='space-x-3'>
            {!!commentChildren.length && (
              <span className='capsize inline-block cursor-pointer rounded-sm px-2 py-1 text-sm transition-colors duration-300 hover:bg-primary-light hover:text-primary  '>
                <CommentOutlined className='mr-1 align-baseline' />
                <CountDown num={commentChildren.length} />
              </span>
            )}
            <button
              className={classNames(
                'capsize inline-block cursor-pointer rounded-sm px-3 py-1 text-sm transition-colors duration-300',
                isLike
                  ? 'bg-danger-light text-danger'
                  : 'hover:bg-danger-light hover:text-danger'
              )}
              onClick={handleLike}
              type='button'
            >
              {isLike ? (
                <LikeFilled className='mr-1 align-baseline' />
              ) : (
                <LikeOutlined className='mr-1 align-baseline' />
              )}
              <CountDown num={comment.liking} />
            </button>
          </div>

          {reply?.id === comment.id ? (
            <button
              type='button'
              className='capsize inline-block cursor-pointer rounded-sm bg-white px-3 py-1 text-sm text-dark-2 transition-colors duration-300'
              onClick={handleCancelReply}
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
              onClick={handleReply}
            >
              <ReplyOutlined className='mr-1' />
              回复
            </button>
          )}
        </div>
      </div>

      {children}
    </div>
  );
};

export default CommentCard;
