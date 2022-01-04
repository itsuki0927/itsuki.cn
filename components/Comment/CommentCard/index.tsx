import classNames from 'classnames';
import { HeartFilled, HeartOutlined, Icon } from '@/components/icons';
import { Button, IconButton, MarkdownBlock } from '@/components/ui';
import { Comment } from '@/entities/comment';
import useLikeComment from '@/framework/local/comment/use-like-comment';
import { NoReturnFunction } from '@/types/fn';
import getGravatarUrl from '@/utils/gravatar';
import markedToHtml from '@/utils/marked';
import scrollTo from '@/utils/scrollTo';
import styles from './style.module.scss';

export const buildCommentDomId = (id: number) => `comment-${id}`;

interface CommentCardCommonProps {
  comment: Comment;
}

interface CommentCardProps extends CommentCardCommonProps {
  onReply: NoReturnFunction<Comment>;
}

const CommentCard = ({ comment, onReply }: CommentCardProps) => {
  const contentHtml = markedToHtml(comment.content, { purify: true });
  const likeComment = useLikeComment({ articleId: comment.articleId });

  const handleLikeComment = () => {
    if (comment.isLike) return;
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
            <Button
              size='small'
              type='text'
              onClick={() => {
                scrollTo(`#${buildCommentDomId(comment.parentId)}`, 400, {
                  offset: -64,
                });
              }}
            >
              {comment.parentNickName}
            </Button>
          </p>
        )}

        <MarkdownBlock
          className={`${styles.commentContent} comment`}
          htmlContent={contentHtml}
        />

        <div className={styles.footer}>
          <div className={styles.actions}>
            <IconButton
              size='small'
              type='ghost'
              icon={comment.isLike ? <HeartFilled /> : <HeartOutlined />}
              onClick={handleLikeComment}
              className={classNames(styles.action, {
                [styles.liked]: comment.isLike,
              })}
            >
              {comment.liking}人点赞
            </IconButton>
            <IconButton
              size='small'
              type='ghost'
              icon={<Icon name='thunderbolt' />}
              className={`${styles.action} ${styles.replyBtn}`}
              onClick={() => {
                onReply(comment);
                // scrollTo(`#commentForm`, 200, {
                //   offset: 64,
                // });
              }}
            >
              回复
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
