import { getGravatarUrl } from 'transformers/gravatar';
import Card from '@/components/Card';
import { USER_COMMENT_PROFILE } from '@/constants/comment';
import { getJSON } from '@/utils/storage';
import MarkdownEditor from './Markdown';
import CommentProfile, { CommentProfileType } from './Profile';
import styles from './style.module.scss';

const noPadding = { padding: 0 };

export type EditorProps = {
  onSend: (data: CommentProfileType & { content: string }) => Promise<boolean>;
};

const Editor = ({ onSend }: EditorProps) => {
  const handleSend = (content: string) => {
    const commentProfile = getJSON(USER_COMMENT_PROFILE);
    return onSend({ ...commentProfile, content });
  };

  return (
    <Card bodyStyle={noPadding} bordered={false}>
      <div className={styles.editor}>
        <img
          className={styles.avatar}
          src={getGravatarUrl('2309899048@qq.com')}
          width={80}
          height={80}
          alt='cover'
        />
        <div className={styles.wrapper}>
          <CommentProfile />
          <MarkdownEditor onSend={handleSend} />
        </div>
      </div>
    </Card>
  );
};

export default Editor;
