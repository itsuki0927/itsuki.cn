import classNames from 'classnames';
import Link from 'next/link';
import { ToDate } from '@/components/common';
import { MarkdownBlock } from '@/components/ui';
import { GAEventCategories } from '@/constants/gtag';
import useLikeComment from '@/hooks/comment/useLikeComment';
import { gtag } from '@/utils/gtag';
import { isAdminEmail } from '@/utils/validate';
import CommentAvatar from '../CommentAvatar';
import { getCommentElementId } from '@/constants/anchor';
import markedToHtml from '@/libs/marked';
import { Comment } from '@/entities/comment';

type CommentCardProps = {
  className?: string;
  data: Comment;
};

const buildReplyCommentText = (parentNickName: string, commentId: number) =>
  `***@${parentNickName}-${commentId}***      `;

const CommentCard = ({ data: comment, className }: CommentCardProps) => {
  const { isLike, mutation } = useLikeComment({
    articleId: Number(comment.articleId),
    commentId: Number(comment.id),
  });

  const handleLike = () => {
    if (isLike) {
      return;
    }
    gtag.event('like_comment', {
      category: GAEventCategories.Comment,
    });
    mutation.mutateAsync();
  };

  return (
    <div
      id={getCommentElementId(comment.id)}
      key={comment.id}
      className={`transition-all duration-500 ${className}`}
    >
      <div className='relative flex-col space-y-2 rounded-sm'>
        <MarkdownBlock
          htmlContent={markedToHtml(
            comment.parentId
              ? `${buildReplyCommentText(comment.parentNickName, comment.id)}${
                  comment.content
                }`
              : comment.content
          )}
        />
        <header className='flex items-end space-x-3'>
          <CommentAvatar avatar={comment.avatar} className='-mr-1' />
          <span className='text-sm text-gray-500 line-clamp-1'>
            {comment.nickname}
            {isAdminEmail(comment.email) && (
              <Link href='/about'>
                <small className='ml-1 cursor-pointer text-gray-400 opacity-70 transition-opacity hover:opacity-100'>
                  (博主)
                </small>
              </Link>
            )}
          </span>

          <span className=' text-gray-200 dark:text-gray-800'>/</span>
          <span className='flex items-center text-sm text-gray-400'>
            <ToDate date={comment.createAt} />
          </span>

          <span className=' text-gray-200 dark:text-gray-800'>/</span>
          <span className='text-sm text-gray-400'>
            {comment.province}
            <i className='mx-1'>•</i>
            {comment.city}
          </span>

          <span className='text-gray-200 dark:text-gray-800'>/</span>

          <button
            key='reply-btn'
            type='button'
            className={classNames(
              'text-sm',
              isLike ? 'cursor-not-allowed text-danger' : 'text-gray-400'
            )}
            onClick={handleLike}
          >
            点赞({comment.liking})
          </button>
        </header>
      </div>
    </div>
  );
};

export default CommentCard;
