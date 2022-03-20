import dynamic from 'next/dynamic';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { CloseOutlined, SendOutlined } from '@/components/icons';
import { Button, IconButton } from '@/components/ui';
import getGravatarUrl from '@/utils/gravatar';
import scrollTo from '@/utils/scrollTo';
import CommentProfile from './CommentProfile';
import { buildCommentDomId } from '../CommentCard';
import { initialCommentProfile, USER_COMMENT_PROFILE } from '@/constants/comment';
import { Comment } from '@/entities/comment';
import usePostComment from '@/framework/local/comment/use-post-comment';
import purifyDomString from '@/utils/purify';
import { useLocalStorage } from '@/hooks';
import { EmptyFunction, NoReturnFunction } from '@/types/fn';

const DynamicMarkdown = dynamic(() => import('@/components/common/MarkdownEditor'), {
  ssr: false,
});

interface ReplyPlaceholderProps {
  reply?: Comment;
  onCloseReply: EmptyFunction;
}

const CommentReply = ({ reply, onCloseReply }: ReplyPlaceholderProps) =>
  reply ? (
    <div className='mb-3'>
      <p className='py-1 px-3 rounded-sm bg-gray-50 transition-colors hover:bg-gray-100'>
        回复:
        <Button
          type='text'
          size='small'
          className='cursor-pointer font-bold'
          onClick={() => {
            scrollTo(`#${buildCommentDomId(reply.id)}`, 400, {
              offset: -64,
            });
          }}
        >
          {` #${reply.nickname}`}
        </Button>
        <CloseOutlined
          className='py-1 float-right cursor-pointer hover:text-gray-600'
          onClick={onCloseReply}
        />
      </p>
    </div>
  ) : null;

interface CommentFormProps {
  articleId: number;
}

export interface CommentFormRef {
  clearReply: EmptyFunction;
  setReply: NoReturnFunction<Comment>;
}

const CommentForm = forwardRef<CommentFormRef, CommentFormProps>(({ articleId }, ref) => {
  const postComment = usePostComment({ articleId });
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState<Comment>();
  const [profile, setProfile] = useLocalStorage(
    USER_COMMENT_PROFILE,
    initialCommentProfile
  );
  const [content, setContent] = useState('');

  useImperativeHandle(ref, () => ({
    clearReply: () => setReply(undefined),
    setReply: (replyParams: Comment) => setReply(replyParams),
  }));

  const handleSend = async () => {
    if (!content) {
      alert('请输入评论内容');
      return false;
    }
    try {
      setLoading(true);
      await postComment({
        ...profile,
        content: purifyDomString(content),
        articleId,
        agent: navigator.userAgent,
        parentId: reply?.id,
      });
      setReply(undefined);
      setContent('');
      setLoading(false);
      return true;
    } catch (error: any) {
      const [{ message }] = error.errors;
      alert(`评论发布失败: ${message}\n`);
      // alert(
      //   `评论发布失败\n
      //  1：检查邮箱是否符合格式\n
      //  2：被 Akismet 过滤\n
      //  3：邮箱/IP 被列入黑名单\n
      //  4：内容包含黑名单关键词\n
      //   `
      // );
      return false;
    }
  };

  return (
    <div id='commentForm' className='flex bg-white p-3 items-start space-x-3'>
      <img
        className='rounded-sm mt-11 border-solid border-4 border-gray-200'
        src={'https://static.itsuki.cn/avatar1.jpg' || getGravatarUrl(profile.email)}
        width={80}
        height={80}
        alt='cover'
      />
      <div className='flex-grow space-y-3'>
        <CommentReply reply={reply} onCloseReply={() => setReply(undefined)} />
        <CommentProfile value={profile} onChange={setProfile} />

        <DynamicMarkdown code={content} onChange={setContent} />
        <div className='flex justify-between'>
          <IconButton
            type='primary'
            className='w-32 align-top'
            icon={<SendOutlined />}
            disabled={loading}
            onClick={handleSend}
          >
            {loading ? '发射中...' : '发射'}
          </IconButton>
        </div>
      </div>
    </div>
  );
});

export default CommentForm;
