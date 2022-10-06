import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { Code, Eye, EyeOff, Image, Link } from 'react-feather';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { PostCommentBody } from '@/entities/comment';
import useBlackList from '@/hooks/blacklist';
import purifyDomString from '@/libs/purify';
import SendButton from '../SendButton';
import CommentAvatar from '../CommentAvatar';
import EmojiButton from '@/components/common/MarkdownEditor/EmojiButton';
import IconButton from '@/components/common/MarkdownEditor/IconButton';
import { useLocalStorage } from '@/hooks';
import { remove } from '@/utils/storage';
import { useAuth } from '@/libs/auth';

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

const CommentPublisher = ({
  className,
  articleId,
  onPost,
  loading,
  parentId = 0,
  onSuccess,
  onError,
}: CommentFormProps) => {
  const { user, signout } = useAuth();
  const router = useRouter();
  const cacheContentKey = `${router.asPath}-comment-publisher-${parentId}`;
  const [content, setContent] = useLocalStorage(cacheContentKey, '');
  const { data: blacklist } = useBlackList();

  const email = user?.email ?? '';
  const avatar = user?.avatar ?? '';
  const nickname = user?.nickname ?? '';

  const ensureCommentCanPush = useCallback(() => {
    const sensitiveKeyword = blacklist?.keyword.find(k => content.includes(k));
    if (sensitiveKeyword) {
      toast.error(`老铁, 评论内容有敏感词: ${sensitiveKeyword}\n`, {
        duration: 2500,
      });
      return false;
    }
    if (blacklist?.email.includes(user?.email ?? '')) {
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
  }, [blacklist?.email, blacklist?.keyword, content, user?.email]);

  const handleConfirm = () =>
    new Promise<boolean>((resolve, reject) => {
      if (user) {
        const { provider } = user;
        const params: PostCommentBody = {
          articleId,
          provider,
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
              remove(cacheContentKey);
              resolve(true);
            } else {
              onError?.();
              reject();
            }
          }, reject);
        }
      }
    });

  const renderHeader = useCallback(
    () => (
      <div className='flex justify-between border-b border-dashed border-gray-200 px-3 py-1'>
        <div className='flex items-center'>
          <CommentAvatar avatar={avatar} />
          <span className='ml-2'>{nickname}</span>
        </div>

        <button
          type='button'
          className='text-gray-400 transition-all hover:text-gray-900 hover:underline'
          onClick={signout}
        >
          退出
        </button>
      </div>
    ),
    [avatar, nickname, signout]
  );

  const renderFooter = ({ codeRef, preview, onPreview }: any) => (
    <div className='flex justify-between border-t border-dashed border-gray-200 px-3 py-1'>
      <div>
        <IconButton
          className='rounded-sm px-2 py-2 hover:bg-gray-100'
          onClick={() => codeRef.current?.insertMarkdownOption('bc')}
        >
          <Code size={18} />
        </IconButton>
        <IconButton
          className='rounded-sm px-2 py-2 hover:bg-gray-100'
          onClick={() => codeRef.current?.insertMarkdownOption('image')}
        >
          <Image size={18} />
        </IconButton>
        <IconButton
          className='rounded-sm px-2 py-2 hover:bg-gray-100'
          onClick={() => codeRef.current?.insertMarkdownOption('link')}
        >
          <Link size={18} />
        </IconButton>
        <EmojiButton
          size={18}
          className='rounded-sm px-2 py-2 hover:bg-gray-100'
          emojiClassName='bottom-[42px] top-10'
          onInsertEmoji={emoji => {
            codeRef.current?.insertEmoji(emoji);
          }}
        />
        <IconButton
          className='rounded-sm px-2 py-2 hover:bg-gray-100'
          onClick={() => onPreview(!preview)}
        >
          <SwitchTransition mode='out-in'>
            <CSSTransition
              key={preview ? 'preview' : 'edit'}
              addEndListener={(node, done) =>
                node.addEventListener('transitionend', done, false)
              }
              classNames='move'
            >
              {preview ? (
                <EyeOff key='edit' size={18} />
              ) : (
                <Eye key='preview' size={18} />
              )}
            </CSSTransition>
          </SwitchTransition>
        </IconButton>
      </div>

      <SendButton
        className='space-x-2 rounded-sm px-8 py-2'
        onConfirm={handleConfirm}
        loading={loading}
      >
        <span className='capsize'>发射</span>
      </SendButton>
    </div>
  );

  return (
    <div id='commentForm' className={className}>
      <DynamicMarkdown
        contentClassName='max-h-[200px] min-h-[150px] '
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
