import { useState } from 'react';
import classNames from 'classnames';
import { Smile } from 'react-feather';
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
import { CommentTree } from '../CommentView/utils';
import styles from './index.module.scss';
import CommentForm from '../CommentForm';
import CommentList from '../CommentList';
import { useCreateComment } from '@/hooks/comment';

type CommentCardProps = {
  className?: string;
  data: CommentTree;
};

const CommentCard = ({ data: comment, className }: CommentCardProps) => {
  const articleId = Number(comment.articleId);
  const commentId = Number(comment.id);
  const { postComment, isLoading } = useCreateComment(articleId);
  const { isLike, mutation } = useLikeComment({
    articleId,
    commentId,
  });
  const [isReply, setReply] = useState(false);

  const handleLike = () => {
    if (isLike) {
      return;
    }
    gtag.event('like_comment', {
      category: GAEventCategories.Comment,
    });
    mutation.mutateAsync();
  };

  const handleReply = () => {
    setReply(v => !v);
  };

  const parentId = isReply ? comment.id : 0;

  return (
    <div
      id={getCommentElementId(comment.id)}
      key={comment.id}
      className={`transition-all duration-500 ${className} bg-gray-50 pt-6 pb-3 pr-3 ${styles.comment}`}
    >
      <div className='relative flex-col space-y-2 rounded-sm'>
        <div className='flex items-center justify-between pl-6'>
          <CommentAvatar avatar={comment.avatar} />
          <span className='ml-2 flex-grow font-medium text-gray-900 line-clamp-1'>
            {comment.nickname}
            {isAdminEmail(comment.email) && (
              <Link href='/about'>
                <small className='ml-1 cursor-pointer text-gray-400 opacity-70 transition-opacity hover:opacity-100'>
                  (博主)
                </small>
              </Link>
            )}
          </span>

          <div className='flex items-center pr-6'>
            <span className='flex items-center text-sm text-gray-400'>
              <ToDate date={comment.createAt} />
            </span>

            <span className='mx-2 text-gray-200 dark:text-gray-800'>/</span>

            <span className='text-sm text-gray-400'>
              {comment.province}
              <i className='mx-1'>•</i>
              {comment.city}
            </span>
          </div>
        </div>

        <MarkdownBlock className='pl-6' htmlContent={markedToHtml(comment.content)} />

        <div className='flex items-center space-x-3 pl-6'>
          <button
            key='reply-btn'
            type='button'
            className={classNames(
              'text-sm',
              isLike ? 'cursor-not-allowed text-danger' : 'text-gray-400'
            )}
            onClick={handleLike}
          >
            <Smile size={16} />
          </button>

          <span className='mx-2 text-gray-200 dark:text-gray-800'>/</span>

          <button type='button' className='text-sm text-gray-400' onClick={handleReply}>
            {isReply ? '取消回复' : '回复'}
          </button>
        </div>
      </div>

      {isReply ? (
        <CommentForm
          parentId={parentId}
          onPost={postComment}
          loading={isLoading}
          articleId={comment.articleId}
          className={styles.form}
          onSuccess={() => {
            setReply(false);
          }}
        />
      ) : null}

      {!!comment.children?.length && <CommentList data={comment.children} />}
    </div>
  );
};

export default CommentCard;
