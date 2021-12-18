import classNames from 'classnames';
import { HeartFilled, HeartOutlined, Icon } from '@/components/icons';
import { MarkdownBlock } from '@/components/ui';
import { Comment } from '@/entities/comment';
import useInLikeComments from '@/framework/local/comment/use-in-like-comment';
import useLikeComment from '@/framework/local/comment/use-like-comment';
import getGravatarUrl from '@/utils/gravatar';
import markedToHtml from '@/utils/marked';
import scrollTo from '@/utils/scrollTo';
import styles from './style.module.scss';

const buildCommentDomId = (id: number) => `comment-${id}`;

interface CommentCardCommonProps {
  comment: Comment;
}

interface CommentCardProps extends CommentCardCommonProps {
  onReply: (data: Comment) => void;
}

const CommentCard = ({ comment, onReply }: CommentCardProps) => {
  const contentHtml = markedToHtml(comment.content, { purify: true });
  const likeComment = useLikeComment({ articleId: comment.articleId });
  const isLiked = useInLikeComments(comment.id);

  const handleLikeComment = () => {
    if (isLiked) return;
    likeComment({ commentId: comment.id });
  };

  return (
    <div
      id={buildCommentDomId(comment.id)}
      key={comment.id}
      className={styles.commentCard}
    >
      <img
        src={getGravatarUrl(comment.email)}
        width={60}
        height={60}
        className={styles.avatar}
        alt='avatar'
      />

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.name}>{comment.nickname}</div>

          <span className={styles.ua}>
            {comment.province} - {comment.city}
          </span>

          <span className={styles.date}>
            {new Date(comment.createAt).toLocaleTimeString()}
          </span>
        </div>

        {!!comment.parentId && (
          <p className={styles.reply}>
            @
            <button
              style={{ border: 'none' }}
              type='button'
              onClick={() => {
                scrollTo(`#${buildCommentDomId(comment.parentId)}`, 400, {
                  offset: -64,
                });
              }}
            >
              {comment.parentNickName}
            </button>
          </p>
        )}

        <MarkdownBlock
          className={`${styles.commentContent} comment`}
          htmlContent={contentHtml}
        />

        <div className={styles.footer}>
          <div className={styles.actions}>
            <button
              type='button'
              onClick={handleLikeComment}
              className={classNames(styles.action, {
                [styles.liked]: isLiked,
                [styles.disabled]: isLiked,
              })}
            >
              {isLiked ? <HeartFilled /> : <HeartOutlined />}
              {comment.liking}人点赞
            </button>
            <button
              type='button'
              className={`${styles.action} ${styles.replyBtn}`}
              onClick={() => {
                onReply(comment);
              }}
            >
              <Icon name='thunderbolt' />
              回复
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
