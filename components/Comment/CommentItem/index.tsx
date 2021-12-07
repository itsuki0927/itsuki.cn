import { HeartFilled, HeartOutlined, SelectOutlined } from '@/components/icons';
import { Button, Card, MarkdownBlock } from '@/components/ui';
import { Comment } from '@/entities/comment';
import useInLikeComments from '@/framework/blog/comment/use-in-like-comment';
import useLikeComment from '@/framework/local/comment/use-like-comment';
import { getGravatarUrl, parseUA } from '@/transformers/index';
import markedToHtml from '@/utils/marked';
import scrollTo from '@/utils/scrollTo';
import { useReplyDispatch } from '../context';
import LikeButton from '../LikeButton';
import styles from './style.module.scss';

const buildCommentDomId = (id: number) => `comment-${id}`;

interface CommentCardProps {
  comment: Comment;
}

const CommentUA = ({ result }: any) => (
  <span className={styles.ua}>
    {result.browser.name}{' '}
    {result.browser.version.slice(0, result.browser.version.indexOf('.'))}
    {'  '}
    {result.os.name}
    {result.os.version}
  </span>
);

const CommentCardTitle = ({ comment }: CommentCardProps) => {
  const { result } = parseUA(comment.agent);
  return (
    <div>
      <span>{comment.nickname}</span>

      <CommentUA result={result} />

      <span className={styles.ua}>
        {comment.city} - {comment.province}
      </span>

      <span className={styles.serialNumber}># {comment.id}</span>
    </div>
  );
};

const CommentCardDescription = ({ comment }: CommentCardProps) => (
  <div className={styles.reply}>
    {!!comment.parentId && (
      <span className={styles.nickname}>
        回复
        <strong
          role='button'
          tabIndex={0}
          onMouseDown={() => {
            scrollTo(`#${buildCommentDomId(comment.parentId)}`, 400, { offset: -64 });
          }}
        >
          #{comment.parentNickName}
        </strong>
      </span>
    )}
    <span className={styles.date}>{new Date(comment.createAt).toLocaleString()}</span>
  </div>
);

const CommentCard = ({ comment }: CommentCardProps) => {
  const contentHtml = markedToHtml(comment.content, { purify: true });
  const replyDispatch = useReplyDispatch();
  const likeComment = useLikeComment();
  const isLiked = useInLikeComments(comment.id);

  const handleLikeComment = () => likeComment({ commentId: comment.id });

  return (
    <Card
      id={buildCommentDomId(comment.id)}
      key={comment.id}
      bodyStyle={{ padding: 12 }}
      className={styles.commentItem}
      actions={[
        <LikeButton
          type='text'
          liking={comment.liking}
          isLiked={isLiked}
          onLiked={handleLikeComment}
          // eslint-disable-next-line react/no-unstable-nested-components
          iconRender={() => (isLiked ? <HeartFilled /> : <HeartOutlined />)}
        >
          {({ liking }) => <span>{liking}</span>}
        </LikeButton>,
        <Button
          key='reply'
          type='text'
          icon={<SelectOutlined />}
          onClick={() => {
            replyDispatch({
              type: 'reply',
              payload: comment,
            });
          }}
        >
          回复
        </Button>,
      ]}
    >
      <Card.Meta
        title={<CommentCardTitle comment={comment} />}
        description={<CommentCardDescription comment={comment} />}
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
        <MarkdownBlock htmlContent={contentHtml} />
      </Card>
    </Card>
  );
};

export default CommentCard;
