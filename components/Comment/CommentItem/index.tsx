import { HeartFilled, HeartOutlined, SelectOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useContext, useState } from 'react';
import { Button, Card } from '@/components/ui';
import { Comment } from '@/entities/comment';
import useInLikeComments from '@/framework/blog/comment/use-in-like-comment';
import useLikeComment from '@/framework/local/comment/use-like-comment';
import { getGravatarUrl } from '@/transformers/gravatar';
import { parseUA } from '@/transformers/ua';
import markedToHtml from '@/utils/marked';
import CommentContext from '../context';
import styles from './style.module.scss';

type CommentCardProps = {
  comment: Comment;
};

const CommentUA = ({ result }: any) => (
  <span className={styles.ua}>
    {result.browser.name}{' '}
    {result.browser.version.slice(0, result.browser.version.indexOf('.'))}
    {'  '}
    {result.os.name}
    {result.os.version}
  </span>
);

const CommentCard = ({ comment }: CommentCardProps) => {
  const { result } = parseUA(comment.agent);
  const { setReply } = useContext(CommentContext);
  const likeComment = useLikeComment();
  const isLiked = useInLikeComments(comment.id);
  const [liking, setLiking] = useState(comment.liking);
  const [liked, setLiked] = useState(isLiked);

  const handleLike = () => {
    likeComment({ commentId: comment.id });
    setLiking(l => l + 1);
    setLiked(true);
  };

  const titleDom = (
    <div>
      <span>{comment.nickname}</span>

      <CommentUA result={result} />

      <span className={styles.ua}>
        {comment.city} -{comment.province}
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
      className={styles.commentItem}
      actions={[
        <Button
          key='liking'
          type='text'
          disabled={liked}
          className={classNames({
            [styles.liked]: liked,
          })}
          icon={liked ? <HeartFilled /> : <HeartOutlined />}
          onClick={handleLike}
        >
          <span>{liking}</span>
        </Button>,
        <Button
          key='reply'
          type='text'
          icon={<SelectOutlined />}
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
            alt='avatar'
          />
        }
      />
      <Card
        bodyStyle={{ padding: '12px 0px' }}
        className={styles.content}
        bordered={false}
      >
        <div
          className='markdown-html comment'
          dangerouslySetInnerHTML={{ __html: markedToHtml(comment.content) }}
        />
      </Card>
    </Card>
  );
};

export default CommentCard;
