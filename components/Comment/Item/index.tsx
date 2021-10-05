import Button from '@/components/Button';
import { Comment } from '@/entities/comment';
import markedToHtml from '@/utils/marked';
import { HeartFilled, SelectOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useState } from 'react';
import { getGravatarUrl } from 'transformers/gravatar';
import { parseUA } from 'transformers/ua';
import Card from '../../Card';
import styles from './style.module.scss';

type CommentCardProps = {
  liked: boolean;
  comment: Comment;
  onLikeComment: (commentId: number) => Promise<void>;
};

const CommentCard = ({ comment, liked, onLikeComment }: CommentCardProps) => {
  const { result } = parseUA(comment.agent);
  const [liking, setLiking] = useState(comment.liking);

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
          onClick={() => {}}
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
      <div
        className='markdown-html'
        dangerouslySetInnerHTML={{ __html: markedToHtml(comment.content) }}
      ></div>
    </Card>
  );
};

export default CommentCard;
