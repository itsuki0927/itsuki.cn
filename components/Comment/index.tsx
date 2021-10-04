import { getCommentListByArticleId, postComment } from '@/api/comment';
import { Comment } from '@/entities/comment';
import useLikeHistory from '@/hooks/useLikeHistory';
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
  const { isArticleLiked, setArticleLike } = useLikeHistory();
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
            disabled={isArticleLiked(articleId)}
            icon={
              <HeartFilled
                className={classNames(styles.liking, {
                  [styles.liked]: isArticleLiked(articleId),
                })}
              />
            }
            onClick={() => {
              onLikeArticle(articleId).then(() => {
                setArticleLike(articleId);
              });
            }}
          >
            {liking}个人
          </Button>
        </>
      }
    >
      {comments?.map(item => {
        return <CommentCard comment={item} key={item.id} />;
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
