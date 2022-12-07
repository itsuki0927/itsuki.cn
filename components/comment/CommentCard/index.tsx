import remarkGfm from 'remark-gfm';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { usePathname } from 'next/navigation';
import useMeasure from 'react-use-measure';
import { motion } from 'framer-motion';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import Link from 'next/link';
import { MouseEvent, useEffect, useState } from 'react';
import { Smile } from 'react-feather';
import toast from 'react-hot-toast';
import { ToDate } from '@/components/common';
import { getCommentElementId } from '@/constants/anchor';
import { useCreateComment, useLikeComment } from '@/hooks/comment';
import { isAdminEmail } from '@/utils/validate';
import CommentAvatar from '../CommentAvatar';
import CommentForm from '../CommentForm';
import CommentList from '../CommentList';
import { CommentTree } from '../CommentView/utils';
import styles from './index.module.scss';
import { useAuth } from '@/libs/auth';
import { markdownComponents } from '@/components/ui/Mdx';

const emojiList = ['👍', '👎', '😄', '🎉', '😕', '👀'];

type CommentCardProps = {
  className?: string;
  data: CommentTree;
};

const CommentCard = ({ data: comment, className }: CommentCardProps) => {
  const blogId = Number(comment.blogId);
  const { postComment, isLoading } = useCreateComment(blogId);
  const [isReply, setReply] = useState(false);
  const [active, setActive] = useState(false);
  const pathname = usePathname();
  const { likeComment, emojiMap } = useLikeComment({ comment });
  const { user } = useAuth();
  const email = user?.email ?? '';
  const [ref, { height: viewHeight }] = useMeasure();

  const variants = {
    visible: { opacity: 1, height: viewHeight },
    hidden: { opacity: 0, height: 0 },
  };

  const isNotLogin = () => {
    if (!email) {
      toast.loading('请先登陆...');
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

  const openEmojiPopover = (e: MouseEvent) => {
    e.stopPropagation();
    if (isNotLogin()) {
      return;
    }
    setActive(v => !v);
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
          <div className='ml-2 flex flex-grow items-center font-medium text-gray-900'>
            <span>{comment.nickname}</span>
            {/* TODO: display provider */}
            {isAdminEmail(comment.email) && (
              <small className='cursor-pointert ml-1 rounded-sm bg-primary-light px-1 py-[2px] text-xs text-primary opacity-90 transition-opacity hover:opacity-100'>
                <Link href='/about'>博主</Link>
              </small>
            )}
          </div>

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

        <ReactMarkdown
          className='pl-4 sm:pl-6'
          components={markdownComponents}
          remarkPlugins={[[remarkGfm]]}
        >
          {comment.content}
        </ReactMarkdown>

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
              {Object.keys(emojiMap ?? {}).map(key => (
                <li>
                  <button
                    type='button'
                    className={classNames(
                      'flex items-center rounded-md border border-solid border-gray-300 py-[2px] px-1 hover:bg-gray-200'
                    )}
                    onClick={() => likeComment(key)}
                  >
                    <span className='text-xs'>{key}</span>
                    <span className='ml-[2px] text-xs text-gray-600'>
                      {Object.keys(emojiMap?.[key] || {}).reduce(
                        (r, k) => r + (emojiMap?.[key]?.[k] || 0),
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
                      emojiMap?.[`${emoji}-${email}`] ? 'bg-primary-light' : ''
                    )}
                    onClick={() => likeComment(emoji)}
                  >
                    {emoji}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <span className='text-gray-200 dark:text-gray-800'>/</span>

          <SwitchTransition mode='out-in'>
            <CSSTransition
              key={isReply ? 'replyText' : 'cancelReplyText'}
              addEndListener={(node, done) => {
                node.addEventListener('transitionend', done, false);
              }}
              classNames='fade'
            >
              <button
                type='button'
                className='text-sm text-gray-400'
                onClick={handleReply}
              >
                {isReply ? '取消回复' : '回复'}
              </button>
            </CSSTransition>
          </SwitchTransition>

          <span className='text-gray-200 dark:text-gray-800'>/</span>

          <button
            type='button'
            className='text-sm text-gray-400'
            onClick={() => {
              console.log('edit');
              const input = {
                id: comment.id,
                uid: comment.uid,
              };
              fetch('/api/comment', {
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: user?.token ?? '',
                },
                method: 'patch',
                body: JSON.stringify(input),
              }).then(async res => {
                const data = await res.json();
                console.log('delete data', data);
              });
            }}
          >
            编辑
          </button>

          <span className='text-gray-200 dark:text-gray-800'>/</span>

          <button
            type='button'
            className='text-sm text-gray-400'
            onClick={() => {
              console.log('delete');
              const input = {
                id: comment.id,
                uid: comment.uid,
              };
              fetch('/api/comment', {
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: user?.token ?? '',
                },
                method: 'delete',
                body: JSON.stringify(input),
              }).then(async res => {
                const data = await res.json();
                console.log('delete data', data);
              });
            }}
          >
            删除
          </button>
        </div>
      </div>

      <motion.div
        style={{ overflow: 'hidden' }}
        initial='hidden'
        animate='visible'
        variants={variants}
      >
        <div ref={ref}>
          {isReply ? (
            <CommentForm
              cacheId={`${pathname}-comment-form-${parentId}`}
              parentId={parentId}
              onPost={postComment}
              loading={isLoading}
              blogId={comment.blogId}
              className={styles.form}
              onSuccess={() => {
                setReply(false);
              }}
            />
          ) : null}
        </div>
      </motion.div>

      {!!comment.children?.length && <CommentList data={comment.children} />}
    </div>
  );
};

export default CommentCard;
