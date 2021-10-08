import { useState } from 'react';
import { getGravatarUrl } from 'transformers/gravatar';
import Card from '@/components/Card';
import { initialCommentProfile } from '@/constants/comment';
import MarkdownEditor from './Markdown';
import CommentProfile, { CommentProfileType } from './Profile';
import styles from './style.module.scss';

export type EditorProps = {
  onSend: (data: CommentProfileType & { content: string }) => Promise<boolean>;
};

const Editor = ({ onSend }: EditorProps) => {
  const [commentProfile, setCommentProfile] = useState<CommentProfileType>({
    ...initialCommentProfile,
  });

  const handleSend = (content: string) => onSend({ ...commentProfile, content });

  return (
    <Card bodyStyle={{ padding: 0 }} bordered={false}>
      <div className={styles.editor}>
        <img
          className={styles.avatar}
          src={getGravatarUrl(commentProfile.email)}
          width={80}
          height={80}
          alt='cover'
        />
        <div className={styles.wrapper}>
          <CommentProfile value={commentProfile} onChange={setCommentProfile} />
          <MarkdownEditor onSend={handleSend} />
        </div>
      </div>
    </Card>
  );
};

export default Editor;
