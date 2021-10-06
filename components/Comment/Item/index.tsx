import Button from '@/components/Button';
import { Comment } from '@/entities/comment';
import markedToHtml from '@/utils/marked';
import { HeartFilled, SelectOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useContext, useState } from 'react';
import { getGravatarUrl } from 'transformers/gravatar';
import { parseUA } from 'transformers/ua';
import Card from '../../Card';
import CommentContext from '../context';
import styles from './style.module.scss';

type CommentCardProps = {
  liked: boolean;
  comment: Comment;
  onLikeComment: (commentId: number) => Promise<void>;
};

const CommentUA = ({ result }: any) => {
  return (
    <span className={styles.ua}>
      {result.browser.name} {result.browser.version.slice(0, result.browser.version.indexOf('.'))}
      {'  '}
      {result.os.name}
      {result.os.version}
    </span>
  );
};

const CommentCard = ({ comment, liked, onLikeComment }: CommentCardProps) => {
  const { result } = parseUA(comment.agent);
  const { setReply } = useContext(CommentContext);
  const [liking, setLiking] = useState(comment.liking);

  const titleDom = (
    <div>
      <span>{comment.nickname}</span>

      <CommentUA result={result} />

      <span className={styles.ua}>
        {comment.city} - {comment.province}
      </span>

      <span className={styles.serialNumber}>#11</span>
    </div>
  );

  const descriptionDom = (
    <div className={styles.reply}>
      {!!comment.parentId && (
        <span className={styles.nickname}>
          回复
          <strong> #{comment.parentNickName}</strong>
        </span>
      )}
      <span className={styles.date}>{new Date(comment.createAt).toLocaleString()}</span>
    </div>
  );

  return (
    <Card
      key={comment.id}
      bodyStyle={{ padding: 12 }}
      className={styles.commentCard}
      actions={[
        <Button
          key='liking'
          type='text'
          disabled={liked}
          className={classNames({
            [styles.liked]: liked,
          })}
          icon={<HeartFilled />}
          onClick={() => {
            onLikeComment(comment.id).then(() => setLiking(l => l + 1));
          }}
        >
          {liking}
        </Button>,
        <Button
          key='reply'
          type='text'
          icon={<SelectOutlined className={styles.icon} />}
          onClick={() => {
            setReply(comment);
          }}
        >
          回复
        </Button>,
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
      <Card bodyStyle={{ padding: '12px 0px' }} className={styles.content} bordered={false}>
        <div
          className='markdown-html comment'
          dangerouslySetInnerHTML={{ __html: markedToHtml(comment.content) }}
        ></div>
      </Card>
    </Card>
  );
};

export default CommentCard;
