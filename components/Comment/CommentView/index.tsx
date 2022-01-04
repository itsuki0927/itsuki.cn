import React, { useMemo, useRef } from 'react';
import { Card, Empty } from '@/components/ui';
import useComment from '@/framework/local/comment/use-comment';
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

  const commentListDom = useMemo(
    () =>
      isEmpty || !comments ? (
        <Empty />
      ) : (
        <Card className={styles.comment}>
          {comments.map(item => (
            <CommentCard
              comment={item}
              key={item.id}
              onReply={reply => {
                commentRef.current?.setReply(reply);
              }}
            />
          ))}
        </Card>
      ),
    [isEmpty, comments]
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
