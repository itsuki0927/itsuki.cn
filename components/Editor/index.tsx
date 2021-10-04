import { useState } from 'react';
import { getGravatarUrl } from 'transformers/gravatar';
import Card from '../Card';
import CommentProfile, { CommentProfileType } from './Profile';
import MarkdownEditor from './Markdown';
import styles from './style.module.scss';

export type EditorProps = {
  onSend: (data: CommentProfileType & { content: string }) => Promise<boolean>;
};

const Editor = ({ onSend }: EditorProps) => {
  const [commentProfile, setCommentProfile] = useState<CommentProfileType>({
    nickname: '',
    email: '',
    website: '',
  });

  return (
    <Card bodyStyle={{ padding: 0 }} bordered={false}>
      <div className={styles.wrapper}>
        <img
          className={styles.avatar}
          src={getGravatarUrl(commentProfile.email)}
          width={80}
          height={80}
        />
        <div className={styles.editor}>
          <CommentProfile value={commentProfile} onChange={setCommentProfile} />
          <MarkdownEditor onSend={content => onSend({ ...commentProfile, content })} />
        </div>
      </div>
    </Card>
  );
};

export default Editor;
