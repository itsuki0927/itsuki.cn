import { getCommentListByArticleId, patchCommentMeta, postComment } from '@/api/comment';
import { Comment } from '@/entities/comment';
import useArticleLike from '@/hooks/useArticleLike';
import useCommentLike from '@/hooks/useCommentLike';
import { HeartFilled } from '@ant-design/icons';
import classNames from 'classnames';
import { ReactNode, useEffect, useState } from 'react';
import Button from '../Button';
import Card from '../Card';
import Editor from '../Editor';
import CommentCard from './Item';
import styles from './style.module.scss';

type CommentProps = {
  title: (comments: Comment[], length: number) => string | ReactNode;
  liking: number;
  articleId: number;
  onLikeArticle: (articleId: number) => Promise<void>;
};

const CommentList = ({ title, liking, articleId, onLikeArticle }: CommentProps) => {
  const { isLiked, setArticleLike } = useArticleLike(articleId);
  const { isCommentLiked, setCommentLike } = useCommentLike();
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    getCommentListByArticleId(articleId).then(res => {
      setComments(res);
    });
  }, [articleId]);

  return (
    <Card
      className={styles.comment}
      title={title(comments, comments.length)}
      extra={
        <>
          <Button
            type='dashed'
            disabled={isLiked}
            icon={
              <HeartFilled
                className={classNames(styles.liking, {
                  [styles.liked]: isLiked,
                })}
              />
            }
            onClick={() => {
              onLikeArticle(articleId).then(() => {
                setArticleLike();
              });
            }}
          >
            {liking}个人
          </Button>
        </>
      }
    >
      {comments?.map(item => {
        return (
          <CommentCard
            onLikeComment={commentId => {
              return patchCommentMeta(commentId, { meta: 'liking' }).then(() => {
                setCommentLike(commentId);
              });
            }}
            liked={isCommentLiked(item.id)}
            comment={item}
            key={item.id}
          />
        );
      })}
      <Editor
        onSend={data => {
          return postComment(data).then(data => {
            console.log('data:', data);
            return true;
          });
        }}
      />
    </Card>
  );
};

export default CommentList;
