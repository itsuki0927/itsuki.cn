import React, { useMemo, useRef, useCallback } from 'react';
import { Card, Empty } from '@/components/ui';
import useComment from '@/framework/local/comment/use-comment';
import { Comment } from '@/entities/comment';
import { CommentSkeleton } from '..';
import CommentCard from '../CommentCard';
import CommentForm, { CommentFormRef } from '../CommentForm';
import styles from './style.module.scss';

type CommentProps = {
  articleId: number;
};

const CommentList = ({ articleId }: CommentProps) => {
  const { data: comments, isEmpty, isLoading } = useComment({ articleId });
  const commentRef = useRef<CommentFormRef>(null);

  const handleReply = useCallback(
    () => (reply: Comment) => {
      commentRef.current?.setReply(reply);
    },
    []
  );

  const commentListDom = useMemo(
    () =>
      isEmpty || !comments ? (
        <Empty />
      ) : (
        <Card className={styles.comment}>
          {comments.map(comment => (
            <CommentCard comment={comment} key={comment.id} onReply={handleReply} />
          ))}
        </Card>
      ),
    [isEmpty, comments, handleReply]
  );

  if (isLoading || !comments) {
    return <CommentSkeleton />;
  }

  return (
    <>
      {commentListDom}

      <CommentForm articleId={articleId} ref={commentRef} />
    </>
  );
};

export default CommentList;
