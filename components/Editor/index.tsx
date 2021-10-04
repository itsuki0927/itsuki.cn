import { useState } from 'react';
import { getGravatarUrl } from 'transformers/gravatar';
import Card from '../Card';
import CommentInfo, { CommentInfoType } from './Info';
import MarkdownEditor from './Markdown';
import styles from './style.module.scss';

export type EditorProps = {
  onSend: (data: CommentInfoType & { content: string }) => Promise<boolean>;
};

const Editor = ({ onSend }: EditorProps) => {
  const [commentInfo, setCommentInfo] = useState<CommentInfoType>({
    nickname: '',
    email: '',
    website: '',
  });

  return (
    <Card bodyStyle={{ padding: 0 }} bordered={false}>
      <div className={styles.wrapper}>
        <img
          className={styles.avatar}
          src={getGravatarUrl(commentInfo.email)}
          width={80}
          height={80}
        />
        <div className={styles.editor}>
          <CommentInfo value={commentInfo} onChange={setCommentInfo} />
          <MarkdownEditor onSend={content => onSend({ ...commentInfo, content })} />
        </div>
      </div>
    </Card>
  );
};

export default Editor;
