import React, { useMemo, useRef } from 'react';
import { Empty } from '@/components/ui';
import useComment from '@/framework/local/comment/use-comment';
import { Comment } from '@/entities/comment';
import { CommentSkeleton } from '..';
import CommentCard from '../CommentCard';
import CommentForm, { CommentFormRef } from '../CommentForm';

type CommentProps = {
  articleId: number;
};

const CommentList = ({ articleId }: CommentProps) => {
  const { data: comments, isEmpty, isLoading } = useComment({ articleId });
  const commentRef = useRef<CommentFormRef>(null);

  const handleReply = (reply: Comment) => {
    commentRef.current?.setReply(reply);
  };

  const commentListDom = useMemo(
    () =>
      isEmpty || !comments ? (
        <Empty />
      ) : (
        <div className='bg-white p-4 space-y-4'>
          {comments.map(comment => (
            <CommentCard comment={comment} key={comment.id} onReply={handleReply} />
          ))}
        </div>
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
