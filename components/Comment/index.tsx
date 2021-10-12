import { HeartFilled } from '@ant-design/icons';
import classNames from 'classnames';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { getCommentListByArticleId, patchCommentMeta, postComment } from '@/api/comment';
import { Comment } from '@/entities/comment';
import useArticleLike from '@/hooks/useArticleLike';
import useCommentLike from '@/hooks/useCommentLike';
import { purifyDomString } from '@/transformers/purify';
import Button from '../Button';
import Card from '../Card';
import Empty from '../Empty';
import CommentContext from './context';
import Editor from './Editor';
import { CommentProfileType } from './Editor/Profile';
import CommentCard from './Item';
import styles from './style.module.scss';

type CommentProps = {
  title: (comments: Comment[], length: number) => string | ReactNode;
  liking: number;
  articleId: number;
  onLikeArticle: (articleId: number) => Promise<void>;
};

const CommentList = ({ title, liking, articleId, onLikeArticle }: CommentProps) => {
  const [reply, setReply] = useState<Comment | undefined>();
  const { isLiked, setArticleLike } = useArticleLike(articleId);
  const { isCommentLiked, setCommentLike } = useCommentLike();
  const [comments, setComments] = useState<Comment[]>([]);
  const isCancel = useRef(false);

  const fetchCommentList = useCallback(() => {
    getCommentListByArticleId(articleId).then(res => {
      if (!isCancel.current) {
        setComments(res);
      }
    });
  }, [articleId]);

  useEffect(() => {
    fetchCommentList();

    return () => {
      isCancel.current = true;
    };
  }, [fetchCommentList]);

  const handleLikeComment = (commentId: number) =>
    patchCommentMeta(commentId, { meta: 'liking' }).then(() => {
      setCommentLike(commentId);
    });

  const handleSend = ({ content, ...data }: CommentProfileType & { content: string }) =>
    postComment({
      ...data,
      content: purifyDomString(content),
      articleId,
      agent: navigator.userAgent,
      parentId: reply?.id,
    })
      .then(() => {
        fetchCommentList();
        return true;
      })
      .catch(() => {
        alert(
          `评论发布失败\n1：被 Akismet 过滤\n2：邮箱/IP 被列入黑名单\n3：内容包含黑名单关键词\n
                   `
        );
        return Promise.reject(new Error('评论失败'));
      });

  return (
    <CommentContext.Provider value={{ reply, setReply }}>
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
              {liking}
              个人
            </Button>
          </>
        }
      >
        {comments.length ? (
          comments.map(item => (
            <CommentCard
              onLikeComment={handleLikeComment}
              liked={isCommentLiked(item.id)}
              comment={item}
              key={item.id}
            />
          ))
        ) : (
          <Empty />
        )}
        <Editor onSend={handleSend} />
      </Card>
    </CommentContext.Provider>
  );
};

export default CommentList;
