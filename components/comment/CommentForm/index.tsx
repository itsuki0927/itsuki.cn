import dynamic from 'next/dynamic';
import { useCallback } from 'react';
import { Code, Eye, EyeOff, Link, Image } from 'react-feather';
import toast from 'react-hot-toast';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import EmojiButton from '@/components/common/MarkdownEditor/EmojiButton';
import IconButton from '@/components/common/MarkdownEditor/IconButton';
import { PostCommentBody } from '@/entities/comment';
import { useLocalStorage } from '@/hooks';
import useBlackList from '@/hooks/blacklist';
import purifyDomString from '@/libs/purify';
import { remove } from '@/utils/storage';
import SendButton from '../SendButton';
import { useAuth } from '@/libs/auth';

const DynamicMarkdown = dynamic(() => import('@/components/common/MarkdownEditor'), {
  ssr: false,
});

export interface CommentFormProps {
  cacheId: string;
  className?: string;
  articleId: number;
  loading?: boolean;
  parentId?: number;
  onPost?: (params: PostCommentBody) => Promise<boolean>;
  onSuccess?: () => void;
  onError?: () => void;
}

const CommentForm = ({
  className,
  articleId,
  onPost,
  loading,
  parentId = 0,
  onSuccess,
  onError,
  cacheId,
}: CommentFormProps) => {
  const { user } = useAuth();
  const [content, setContent] = useLocalStorage(cacheId, '');
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
              remove(cacheId);
              resolve(true);
            } else {
              onError?.();
              reject();
            }
          }, reject);
        }
      }
    });

  const renderFooter = ({ preview, onPreview, codeRef }: any) => (
    <div className='flex justify-between bg-gray-50 leading-8'>
      <div className='flex'>
        <IconButton
          className='rounded-sm p-2 hover:bg-gray-100'
          onClick={() => codeRef.current?.insertMarkdownOption('bc')}
        >
          <Code size={16} />
        </IconButton>
        <IconButton
          className='rounded-sm p-2 hover:bg-gray-100'
          onClick={() => codeRef.current?.insertMarkdownOption('image')}
        >
          <Image size={16} />
        </IconButton>
        <IconButton
          className='rounded-sm p-2 hover:bg-gray-100'
          onClick={() => codeRef.current?.insertMarkdownOption('link')}
        >
          <Link size={16} />
        </IconButton>
        <EmojiButton
          className='p-2 hover:bg-gray-100'
          emojiClassName='bottom-8'
          onInsertEmoji={emoji => {
            codeRef.current?.insertEmoji(emoji);
          }}
        />
        <IconButton className='p-2 hover:bg-gray-100' onClick={() => onPreview(!preview)}>
          <SwitchTransition mode='out-in'>
            <CSSTransition
              key={preview ? 'preview' : 'edit'}
              addEndListener={(node, done) =>
                node.addEventListener('transitionend', done, false)
              }
              classNames='move'
            >
              {preview ? (
                <EyeOff key='edit' size={16} />
              ) : (
                <Eye key='preview' size={16} />
              )}
            </CSSTransition>
          </SwitchTransition>
        </IconButton>
      </div>

      <SendButton className='py-2 px-3' onConfirm={handleConfirm} loading={loading}>
        <span className='capsize'>
          {loading ? '正在发布中...' : `以 ${nickname} 的身份发布`}
        </span>
      </SendButton>
    </div>
  );

  return (
    <div id='commentForm' className={className}>
      <DynamicMarkdown
        contentClassName='max-h-[200px] min-h-[150px]'
        code={content}
        onChange={setContent}
        className='flex-grow'
        placeholder='见解'
        footer={renderFooter}
      />
    </div>
  );
};

export default CommentForm;
