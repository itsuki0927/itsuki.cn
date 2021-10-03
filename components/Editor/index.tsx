import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gravatar from 'gravatar';
import Card from '../Card';
import CommentInfo, { CommentInfoType } from './Info';
import MarkdownEditor from './Markdown';
import styles from './style.module.scss';

export type EditorProps = {
  onSend: (data: CommentInfoType & { content: string; avatar: string }) => Promise<boolean>;
};

const Editor = ({ onSend }: EditorProps) => {
  const [commentInfo, setCommentInfo] = useState<CommentInfoType>({
    name: '',
    email: '',
    website: '',
  });
  const avatarRef = useRef<string>();

  useEffect(() => {
    avatarRef.current = gravatar.url('2309899048@qq.com', {}, true);
  }, []);

  return (
    <Card bodyStyle={{ padding: 0 }} bordered={false}>
      <div className={styles.wrapper}>
        <img className={styles.avatar} src={avatarRef.current} width={80} height={80} />
        <div className={styles.editor}>
          <CommentInfo value={commentInfo} onChange={setCommentInfo} />
          <MarkdownEditor
            onSend={content => onSend({ ...commentInfo, content, avatar: avatarRef.current! })}
          />
        </div>
      </div>
    </Card>
  );
};

export default Editor;
