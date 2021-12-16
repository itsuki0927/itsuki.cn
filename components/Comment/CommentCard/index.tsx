import classNames from 'classnames';
import { HeartFilled, HeartOutlined, SelectOutlined } from '@/components/icons';
import { Card, IconButton, MarkdownBlock } from '@/components/ui';
import { Comment } from '@/entities/comment';
import useInLikeComments from '@/framework/blog/comment/use-in-like-comment';
import useLikeComment from '@/framework/local/comment/use-like-comment';
import { getGravatarUrl, parseUA } from '@/transformers/index';
import { markedToHtml, scrollTo } from '@/utils';
import styles from './style.module.scss';

const buildCommentDomId = (id: number) => `comment-${id}`;

interface CommentCardCommonProps {
  comment: Comment;
}

interface CommentCardProps extends CommentCardCommonProps {
  onReply: (data: Comment) => void;
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

const CommentCardTitle = ({ comment }: CommentCardCommonProps) => {
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

const CommentCardDescription = ({ comment }: CommentCardCommonProps) => (
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

const CommentCard = ({ comment, onReply }: CommentCardProps) => {
  const contentHtml = markedToHtml(comment.content, { purify: true });
  const likeComment = useLikeComment({ articleId: comment.articleId });
  const isLiked = useInLikeComments(comment.id);

  const handleLikeComment = () => likeComment({ commentId: comment.id });

  return (
    <Card
      id={buildCommentDomId(comment.id)}
      key={comment.id}
      bodyStyle={{ padding: 12 }}
      className={styles.commentItem}
      bordered
      actions={[
        <IconButton
          type='text'
          disabled={isLiked}
          onClick={handleLikeComment}
          className={classNames({
            [styles.liked]: isLiked,
          })}
          icon={isLiked ? <HeartFilled /> : <HeartOutlined />}
        >
          {comment.liking}
        </IconButton>,
        <IconButton
          key='reply'
          type='text'
          icon={<SelectOutlined />}
          onClick={() => {
            onReply(comment);
          }}
        >
          回复
        </IconButton>,
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
