import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { signOut, useSession } from 'next-auth/react';
import React, { useCallback, useState } from 'react';
import { GAEventCategories } from '@/constants/gtag';
import { gtag } from '@/utils/gtag';
import CommentAvatar from '../CommentAvatar';
import { useGlobalData } from '@/hooks/globalData';
import { useReply } from '../context';
import { PostCommentBody } from '@/entities/comment';
import purifyDomString from '@/libs/purify';
import SendButton from '../SendButton';

const DynamicMarkdown = dynamic(() => import('@/components/common/MarkdownEditor'), {
  ssr: false,
});

interface CommentFormProps {
  className?: string;
  hiddenLogout?: boolean;
  hiddenAvatar?: boolean;
  articleId: number;
  loading?: boolean;
  onSend?: (params: PostCommentBody) => Promise<boolean>;
}

const useLoginType = () => {
  const router = useRouter();
  const loginType = String(router.query?.type ?? 'github');
  return loginType;
};

const CommentForm = ({
  className,
  hiddenLogout,
  hiddenAvatar,
  articleId,
  onSend,
  loading,
}: CommentFormProps) => {
  const loginType = useLoginType();
  const { reply, cancelReply } = useReply();
  const { data: session } = useSession();
  const [content, setContent] = useState('');
  const { data: globalData } = useGlobalData();

  const blacklist = globalData?.blacklist;
  const email = session?.user?.email ?? '';
  const avatar = session?.user?.image ?? '';
  const nickname = session?.user?.name ?? '';

  const ensureCommentCanPush = useCallback(() => {
    const sensitiveKeyword = blacklist?.keyword.find(k => content.includes(k));
    if (sensitiveKeyword) {
      toast.error(`老铁, 评论内容有敏感词: ${sensitiveKeyword}\n`, {
        duration: 2500,
      });
      return false;
    }
    if (blacklist?.email.includes(session?.user?.email ?? '')) {
      toast.error(`老铁, 做了坏事情, 被拉黑了\n`, {
        duration: 2500,
      });
      return false;
    }
    if (!content) {
      toast.error(`老铁, 内容呢?\n`);
      return false;
    }

    return true;
  }, [blacklist?.email, blacklist?.keyword, content, session?.user?.email]);

  const handleSend = useCallback(
    () =>
      new Promise<boolean>((resolve, reject) => {
        const params: PostCommentBody = {
          articleId,
          loginType,
          email,
          avatar,
          nickname,
          agent: navigator.userAgent,
          parentId: reply?.id,
          content: purifyDomString(content),
        };

        if (ensureCommentCanPush()) {
          onSend?.(params).then(result => {
            if (result) {
              setContent('');
              cancelReply();
              resolve(true);
            } else {
              reject();
            }
          }, reject);
        }
      }),
    [
      articleId,
      loginType,
      email,
      avatar,
      nickname,
      reply?.id,
      content,
      ensureCommentCanPush,
      onSend,
      cancelReply,
    ]
  );

  return (
    <div id='commentForm' className={`flex items-start space-x-4 ${className}`}>
      {!hiddenAvatar && (
        <div className='min-w-[63px]'>
          <CommentAvatar avatar={avatar} loginType={loginType} />

          {!hiddenLogout && (
            <span
              tabIndex={0}
              role='button'
              className='block text-center text-xs text-gray-1 transition-colors hover:text-dark-1'
              onClick={() => {
                gtag.event('signout', {
                  category: GAEventCategories.Comment,
                });
                signOut();
              }}
            >
              退出
            </span>
          )}
        </div>
      )}
      <DynamicMarkdown
        code={content}
        onChange={setContent}
        className='flex-grow'
        placeholder='可输入Markdown, 支持换行自动缩进、捕捉Tab、自动补全括号, 还请友善评论'
      >
        <SendButton
          onConfirm={handleSend}
          loading={loading}
          nickname={session?.user?.name}
        />
      </DynamicMarkdown>
    </div>
  );
};

export default CommentForm;
