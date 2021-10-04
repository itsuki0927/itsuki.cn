import { Comment } from '@/entities/comment';
import markedToHtml from '@/utils/marked';
import { HeartOutlined, SelectOutlined } from '@ant-design/icons';
import { getGravatarUrl } from 'transformers/gravatar';
import { parseUA } from 'transformers/ua';
import Card from '../../Card';
import styles from './style.module.scss';

type CommentCardProps = {
  comment: Comment;
};

const CommentCard = ({ comment }: CommentCardProps) => {
  const { result } = parseUA(comment.agent);

  const titleDom = (
    <div>
      <span>{comment.nickname}</span>
      <span className={styles.serialNumber}>#11</span>
    </div>
  );

  const descriptionDom = (
    <div>
      <span>
        {result.browser.name} {result.browser.version} {result.os.name}
        {result.os.version}
      </span>
      <span className={styles.date}>{new Date(comment.createAt).toLocaleString()}</span>
    </div>
  );

  return (
    <Card
      key={comment.id}
      bodyStyle={{ padding: 12 }}
      className={styles.commentCard}
      actions={[
        <span key='liking' className={styles.action}>
          <HeartOutlined className={styles.icon} />
          {comment.liking}
        </span>,
        <span key='liking' className={styles.action}>
          <SelectOutlined className={styles.icon} />
          回复
        </span>,
      ]}
    >
      <Card.Meta
        title={titleDom}
        description={descriptionDom}
        avatar={
          <img
            src={getGravatarUrl(comment.email)}
            width={80}
            height={80}
            className={styles.avatar}
          />
        }
      />
      <div
        className='markdown-html'
        dangerouslySetInnerHTML={{ __html: markedToHtml(comment.content) }}
      ></div>
    </Card>
  );
};

export default CommentCard;
