import { CloseOutlined } from '@/components/icons';
import { Card } from '@/components/ui';
import { Comment } from '@/entities/comment';
import markedToHtml from '@/utils/marked';
import styles from './style.module.scss';

interface ReplyPlaceholderProps {
  reply: Comment | null;
  onCloseReply: () => void;
}

const ReplyPlaceholder = ({ reply, onCloseReply }: ReplyPlaceholderProps) =>
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

export default ReplyPlaceholder;
