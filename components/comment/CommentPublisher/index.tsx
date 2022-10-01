import classNames from 'classnames';
import { Code, Image, Link } from 'react-feather';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { PostCommentBody } from '@/entities/comment';
import useBlackList from '@/hooks/blacklist';
import purifyDomString from '@/libs/purify';
import SendButton from '../SendButton';
import CommentAvatar from '../CommentAvatar';
import EmojiButton from '@/components/common/MarkdownEditor/EmojiButton';
import IconButton from '@/components/common/MarkdownEditor/IconButton';

const DynamicMarkdown = dynamic(() => import('@/components/common/MarkdownEditor'), {
  ssr: false,
});

export interface CommentFormProps {
  className?: string;
  articleId: number;
  loading?: boolean;
  parentId?: number;
  onPost?: (params: PostCommentBody) => Promise<boolean>;
  onSuccess?: () => void;
  onError?: () => void;
}

const useLoginType = () => {
  const router = useRouter();
  const loginType = String(router.query?.type ?? 'github');
  return loginType;
};

const CommentPublisher = ({
  className,
  articleId,
  onPost,
  loading,
  parentId = 0,
  onSuccess,
  onError,
}: CommentFormProps) => {
  const loginType = useLoginType();
  const { data: session } = useSession();
  const [content, setContent] = useState('');
  const { data: blacklist } = useBlackList();

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

  const handleConfirm = useCallback(
    () =>
      new Promise<boolean>((resolve, reject) => {
        const params: PostCommentBody = {
          articleId,
          loginType,
          email,
          avatar,
          nickname,
          parentId,
          agent: navigator.userAgent,
          content: purifyDomString(content),
        };

        if (ensureCommentCanPush()) {
          onPost?.(params).then(result => {
            if (result) {
              setContent('');
              onSuccess?.();
              resolve(true);
            } else {
              onError?.();
              reject();
            }
          }, reject);
        }
      }),
    [
      articleId,
      avatar,
      content,
      email,
      ensureCommentCanPush,
      loginType,
      nickname,
      onError,
      onPost,
      onSuccess,
      parentId,
    ]
  );

  const renderHeader = useCallback(
    ({ preview, onPreview }: any) => (
      <div className='flex justify-between border-b border-dashed border-gray-200 px-3 py-1'>
        <div className='flex items-center'>
          <CommentAvatar avatar={avatar} />
          <span className='ml-2'>{nickname}</span>
        </div>

        <div className='flex items-center'>
          <button
            type='button'
            onClick={() => onPreview(true)}
            className={classNames(
              'rounded-sm px-4 py-[2px]  text-sm',
              preview && 'cursor-default bg-primary-light text-primary'
            )}
          >
            预览
          </button>
          <button
            type='button'
            onClick={() => onPreview(false)}
            className={classNames(
              'rounded-sm px-4 py-[2px] text-sm',
              !preview && 'cursor-default bg-primary-light text-primary'
            )}
          >
            {' '}
            编辑{' '}
          </button>
        </div>
      </div>
    ),
    [avatar, nickname]
  );

  const renderFooter = useCallback(
    ({ codeRef }: any) => (
      <div className='flex justify-between border-t border-dashed border-gray-200 px-3'>
        <div>
          <IconButton
            className='px-2 py-2 hover:bg-gray-100'
            onClick={() => codeRef.current?.insertMarkdownOption('bc')}
          >
            <Code size={18} />
          </IconButton>
          <IconButton
            className='px-2 py-2 hover:bg-gray-100'
            onClick={() => codeRef.current?.insertMarkdownOption('image')}
          >
            <Image size={18} />
          </IconButton>
          <IconButton
            className='px-2 py-2 hover:bg-gray-100'
            onClick={() => codeRef.current?.insertMarkdownOption('link')}
          >
            <Link size={18} />
          </IconButton>
          <EmojiButton
            size={18}
            className='px-2 py-2 hover:bg-gray-100'
            emojiClassName='bottom-[34px] top-10'
            onInsertEmoji={emoji => {
              codeRef.current?.insertEmoji(emoji);
            }}
          />
        </div>

        <SendButton
          className='space-x-2 px-8'
          onConfirm={handleConfirm}
          loading={loading}
        >
          <span className='capsize'>发射</span>
        </SendButton>
      </div>
    ),
    [handleConfirm, loading]
  );

  return (
    <div id='commentForm' className={className}>
      <DynamicMarkdown
        code={content}
        onChange={setContent}
        className='flex-grow'
        placeholder='见解'
        header={renderHeader}
        footer={renderFooter}
      />
    </div>
  );
};

export default CommentPublisher;
