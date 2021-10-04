import markedToHtml from '@/utils/marked';
import { HeartOutlined, SelectOutlined } from '@ant-design/icons';
import { parseUA } from 'transformers/ua';
import gravatar from 'gravatar';
import styles from './style.module.scss';
import Card from '../../Card';

type CommentCardProps = {
  comment: any;
};

const CommentCard = ({ comment }: CommentCardProps) => {
  const ua = parseUA(comment.agent);

  const titleDom = (
    <div>
      <span>{comment.nickname}</span>
      <span className={styles.serialNumber}>#11</span>
    </div>
  );

  const descriptionDom = (
    <div>
      <span>
        {ua.result.browser.name} {ua.result.browser.version} {ua.result.os.name}
        {ua.result.os.version}
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
            src={gravatar.url(comment.email, { protocol: 'https' })}
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
