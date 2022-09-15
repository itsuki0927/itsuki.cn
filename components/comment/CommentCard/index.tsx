import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { MouseEvent, useEffect, useState } from 'react';
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

const emojiList = ['👍', '👎', '😄', '🎉', '😕', '👀'];

type CommentCardProps = {
  className?: string;
  data: CommentTree;
};

const CommentCard = ({ data: comment, className }: CommentCardProps) => {
  const articleId = Number(comment.articleId);
  const commentId = Number(comment.id);
  const { postComment, isLoading } = useCreateComment(articleId);
  const mutation = useLikeComment({
    articleId,
    commentId,
  });
  const [isReply, setReply] = useState(false);
  const [active, setActive] = useState(false);
  const [emojiMap, setEmojiMap] = useState<Record<string, Record<string, number>>>({});
  const { data } = useSession();
  const email = data?.user?.email ?? '2309899048@qq.com';

  const isNotLogin = () => {
    if (!email) {
      toast.loading('请先登陆');
      return true;
    }
    return false;
  };

  const handleReply = () => {
    if (isNotLogin()) {
      return;
    }
    setReply(v => !v);
  };

  function omit<T extends Record<string, any>>(target: T, key: keyof T) {
    return Object.keys(target)
      .filter(k => k !== key)
      .reduce((r, k) => ({ ...r, [k]: target[k] }), {});
  }

  const getLastestEmojiMap = (emoji: string) => {
    const emojiMap2 = emojiMap[emoji] || {};
    const value = emojiMap2[email] || 0;
    if (value) {
      const total = Object.keys(emojiMap2).reduce((r, k) => emojiMap2[k] + r, 0);
      // 如果总数只有1的话, 表示直接删除该emoji
      if (total === 1) return omit(emojiMap, emoji);
      // value == 1 删除该emoji下的email
      if (value === 1) return { ...emojiMap, [emoji]: omit(emojiMap2, email) };
      return {
        ...emojiMap,
        [emoji]: {
          ...emojiMap2,
          [email]: value - 1,
        },
      };
    }
    return {
      ...emojiMap,
      [emoji]: {
        ...emojiMap2,
        [email]: value + 1,
      },
    };
  };

  const handleEmojiClick = (emoji: string) => {
    if (isNotLogin()) {
      return;
    }
    gtag.event('like_comment', {
      category: GAEventCategories.Comment,
    });
    const lastestEmojiMap = getLastestEmojiMap(emoji);
    console.log('lastestEmojiMap', lastestEmojiMap);
    mutation.mutateAsync(
      {
        emoji: JSON.stringify(lastestEmojiMap),
      },
      {
        onSuccess: () => {
          setEmojiMap(lastestEmojiMap);
        },
      }
    );
  };

  const openEmojiPopover = (e: MouseEvent) => {
    e.stopPropagation();
    if (isNotLogin()) {
      return;
    }
    setActive(true);
  };

  useEffect(() => {
    const handleClick = () => {
      setActive(false);
    };
    if (active) {
      document.addEventListener('click', handleClick);
    }
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [active]);

  const parentId = isReply ? comment.id : 0;

  return (
    <div
      id={getCommentElementId(comment.id)}
      key={comment.id}
      className={`transition-all duration-500 ${className} bg-gray-50 pt-4 pb-2 pr-2 sm:pt-6 sm:pb-3 sm:pr-3 ${styles.comment}`}
    >
      <div className='relative flex-col space-y-2 rounded-sm'>
        <div className='flex items-center justify-between pl-4 sm:pl-6'>
          <CommentAvatar avatar={comment.avatar} />
          <span className='ml-2 flex flex-grow items-center font-medium text-gray-900 line-clamp-1'>
            {comment.nickname}
            {isAdminEmail(comment.email) && (
              <Link href='/about'>
                <small className='cursor-pointert ml-1 rounded-sm bg-primary-light px-1 py-[2px] text-xs text-primary opacity-90 transition-opacity hover:opacity-100'>
                  博主
                </small>
              </Link>
            )}
          </span>

          <div className='flex items-center pr-2 sm:pr-6'>
            <span className='flex items-center text-xs text-gray-400 sm:text-sm'>
              <ToDate date={comment.createAt} />
            </span>

            <span className='mx-2 text-gray-200 dark:text-gray-800'>/</span>

            <span className='text-xs text-gray-400 sm:text-sm'>
              {comment.province}
              <i className='mx-1'>•</i>
              {comment.city}
            </span>
          </div>
        </div>

        <MarkdownBlock
          className='pl-4 sm:pl-6'
          htmlContent={markedToHtml(comment.content)}
        />

        <div className='flex items-center space-x-2 pl-4 sm:space-x-3 sm:pl-6'>
          <div className='relative flex'>
            <button
              type='button'
              className='text-sm text-gray-600'
              onClick={openEmojiPopover}
            >
              <Smile
                size={20}
                className='rounded-full border border-solid border-gray-300 p-[2px] hover:bg-gray-200'
              />
            </button>

            <ul className='ml-1 flex space-x-1 sm:ml-2 sm:space-x-2'>
              {Object.keys(emojiMap).map(key => (
                <li>
                  <button
                    type='button'
                    className={classNames(
                      'flex items-center rounded-md border border-solid border-gray-300 py-[2px] px-1 hover:bg-gray-200'
                    )}
                    onClick={() => handleEmojiClick(key)}
                  >
                    <span className='text-xs'>{key}</span>
                    <span className='ml-[2px] text-xs text-gray-600'>
                      {Object.keys(emojiMap[key]).reduce(
                        (r, k) => r + emojiMap[key][k] || 0,
                        0
                      )}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <ul
              className={classNames(
                'absolute top-10 z-50 flex rounded-md border border-solid border-gray-200 bg-white p-1 py-0',
                active ? 'block' : 'hidden'
              )}
            >
              {emojiList.map(emoji => (
                <li key={emoji}>
                  <button
                    type='button'
                    className={classNames(
                      'my-1 mx-[2px] h-8 w-8 rounded-md p-1 transition-colors hover:bg-gray-100',
                      emojiMap[`${emoji}-${email}`] ? 'bg-primary-light' : ''
                    )}
                    onClick={() => handleEmojiClick(emoji)}
                  >
                    {emoji}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <span className='text-gray-200 dark:text-gray-800'>/</span>

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
