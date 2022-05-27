import classNames from 'classnames';
import { ReactNode, useRef } from 'react';
import toast, { Toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { MyImage, ToDate } from '@/components/common';
import {
  CloseOutlined,
  CommentOutlined,
  CompassOutlined,
  GithubOutlined,
  LikeOutlined,
  QQOutlined,
  TimeOutlined,
  WechatOutlined,
} from '@/components/icons';
import ReplyOutlined from '@/components/icons/ReplyOutlined';
import { MarkdownBlock } from '@/components/ui';
import { Comment } from '@/entities/comment';
import { useMarkdown } from '@/hooks';
import useLikeComment from '@/hooks/comment/useLikeComment';
import { NoReturnFunction } from '@/types/fn';
import getGravatarUrl from '@/utils/gravatar';
import scrollTo from '@/utils/scrollTo';
import CommentList, { buildCommentTree, CommentTree } from '../CommentList';

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
      <div className={`relative mb-2 rounded-sm bg-white-1 p-4  ${childClassName}`}>
        <header className='flex items-center'>
          <div className='relative min-w-[55px]'>
            <MyImage
              className='rounded-md border-4 border-solid border-white-3'
              imgClassName='rounded-md'
              src={comment.avatar ?? getGravatarUrl(comment.email)}
              width={55}
              height={55}
              alt='cover'
            />
            <span className='absolute right-1 bottom-1 w-[40%] rounded-sm bg-[#ffffff80] text-center'>
              {comment.loginType === 'github' && (
                <GithubOutlined className='leading-5 text-github' />
              )}
              {comment.loginType === 'qq' && <QQOutlined className='leading-5 text-qq' />}
              {comment.loginType === 'wechat' && (
                <WechatOutlined className='leading-5 text-wechat' />
              )}
            </span>
          </div>
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

            <div className='mt-1 flex flex-grow items-center text-xs text-gray-2 '>
              <span>
                <TimeOutlined className='mr-1 text-xs' />
                <ToDate date={comment.createAt} />
              </span>

              <span className='ml-2'>
                <CompassOutlined className='mr-1 text-xs' />
                <span className='text-xs'>
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
          isComments
          className='lazy clear-left my-3 max-h-[600px] overflow-y-auto'
        />

        <div className='flex justify-between text-gray-1'>
          <div>
            {!!commentChildren.length && (
              <span className='mr-3 inline-block cursor-pointer rounded-sm px-2 py-1 text-xs transition-colors duration-300 hover:bg-primary-light hover:text-primary  '>
                <CommentOutlined className='mr-1' />
                {commentChildren.length}
              </span>
            )}
            <button
              className={classNames(
                'inline-block cursor-pointer rounded-sm px-2 py-1 text-xs transition-colors duration-300 ',
                isLike
                  ? 'bg-danger-light text-danger'
                  : 'hover:bg-danger-light hover:text-danger'
              )}
              onClick={() => {
                if (isLike) {
                  return;
                }
                mutation.mutateAsync();
              }}
              type='button'
            >
              <LikeOutlined className='mr-1' />
              {comment.liking}
            </button>
          </div>

          {replyId === comment.id ? (
            <button
              type='button'
              className='inline-block cursor-pointer rounded-sm bg-white px-2 py-1 text-xs text-dark-2 transition-colors duration-300'
              onClick={() => {
                onCancelReply?.();
                toast.dismiss();
              }}
            >
              <CloseOutlined className='mr-1' />
              取消回复
            </button>
          ) : (
            <button
              type='button'
              disabled={isSignout}
              className={classNames(
                'inline-block rounded-sm px-2 py-1 text-xs transition-colors duration-300',
                isSignout
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer hover:bg-white hover:text-dark-2'
              )}
              onClick={() => {
                toast.dismiss();
                toast.custom(buildCommentReplyToast, {
                  duration: Infinity,
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
