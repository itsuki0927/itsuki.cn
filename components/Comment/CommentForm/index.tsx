import dynamic from 'next/dynamic';
import React, { PropsWithChildren, useState } from 'react';
import { CloseOutlined, SendOutlined } from '@/components/icons';
import { Card, IconButton } from '@/components/ui';
import { Comment } from '@/entities/comment';
import getGravatarUrl from '@/utils/gravatar';
import markedToHtml from '@/utils/marked';
import CommentFormProfile from './CommentFormProfile';
import styles from './style.module.scss';

export * from './CommentFormProfile';
export {
  CommentFormProfile,
  CommentFormContent,
  CommentFormAvatar,
  CommentFormSubmit,
  CommentFormEditor,
  CommentFormReply,
};

const DynamicMarkdown = dynamic(() => import('@/components/common/MarkdownEditor'), {
  ssr: false,
});

const noPadding = { padding: 0 };

const CommentFormAvatar = ({ email }: { email: string }) => (
  <img
    className={styles.avatar}
    src={getGravatarUrl(email)}
    width={80}
    height={80}
    alt='cover'
  />
);

interface CommentFormEditorProps {
  code: string;
  onChange: (code: string) => void;
}

const CommentFormEditor = (props: CommentFormEditorProps) => (
  <Card className={styles.markdown} bordered={false} bodyStyle={{ padding: 0 }}>
    <DynamicMarkdown {...props} />
  </Card>
);

interface CommentFormSubmitProps {
  onSend: () => Promise<boolean>;
}

const CommentFormSubmit = ({ onSend }: CommentFormSubmitProps) => {
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    onSend().then(() => {
      setLoading(false);
    });
  };

  return (
    <div className={styles.actionBar}>
      <IconButton
        type='primary'
        className={styles.send}
        icon={<SendOutlined />}
        disabled={loading}
        onClick={handleSend}
      >
        {loading ? '发射中...' : '发射'}
      </IconButton>
    </div>
  );
};

interface ReplyPlaceholderProps {
  reply?: Comment;
  onCloseReply: () => void;
}

const CommentFormReply = ({ reply, onCloseReply }: ReplyPlaceholderProps) =>
  reply ? (
    <div className={styles.reply}>
      <p className={styles.profile}>
        <span className={styles.nickname}>
          回复:
          <strong>{` #${reply.nickname}`}</strong>
        </span>
        <CloseOutlined className={styles.close} onClick={onCloseReply} />
      </p>
      <Card className={styles.content} bodyStyle={{ padding: '4px 11px' }}>
        <div
          className='markdown-html comment'
          dangerouslySetInnerHTML={{ __html: markedToHtml(reply.content) }}
        />
      </Card>
    </div>
  ) : null;

const CommentFormContent = ({ children }: PropsWithChildren<Record<string, any>>) => (
  <div className={styles.wrapper}>{children}</div>
);

const CommentForm = ({ children }: PropsWithChildren<Record<string, any>>) => (
  <Card bodyStyle={noPadding} bordered={false}>
    <div className={styles.form}>{children}</div>
  </Card>
);

export default CommentForm;
