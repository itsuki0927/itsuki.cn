import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { PostCommentBody } from '@/entities/comment';
import useBlackList from '@/hooks/blacklist';
import purifyDomString from '@/libs/purify';
import { useReply } from '../context';
import SendButton from '../SendButton';

const DynamicMarkdown = dynamic(() => import('@/components/common/MarkdownEditor'), {
  ssr: false,
});

interface CommentFormProps {
  className?: string;
  articleId: number;
  loading?: boolean;
  onSend?: (params: PostCommentBody) => Promise<boolean>;
}

const useLoginType = () => {
  const router = useRouter();
  const loginType = String(router.query?.type ?? 'github');
  return loginType;
};

const CommentForm = ({ className, articleId, onSend, loading }: CommentFormProps) => {
  const loginType = useLoginType();
  const { reply, cancelReply } = useReply();
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
    <div id='commentForm' className={className}>
      <DynamicMarkdown
        code={content}
        onChange={setContent}
        className='flex-grow'
        placeholder='见解'
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
