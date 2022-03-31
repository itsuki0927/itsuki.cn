import React, { useRef } from 'react';
import { Empty } from '@/components/ui';
import { Comment } from '@/entities/comment';
import { CommentSkeleton } from '..';
import CommentCard from '../CommentCard';
import CommentForm, { CommentFormRef } from '../CommentForm';
import { useComments } from '@/hooks/comment';

type CommentProps = {
  articleId: number;
};

const CommentList = ({ articleId }: CommentProps) => {
  const { data: comments, isEmpty, isLoading } = useComments(articleId);
  const commentRef = useRef<CommentFormRef>(null);

  const handleReply = (reply: Comment) => {
    commentRef.current?.setReply(reply);
  };

  if (isLoading) {
    return <CommentSkeleton />;
  }
  if (isEmpty) {
    return <Empty />;
  }

  return (
    <>
      <div className='space-y-4 bg-white p-4'>
        {comments?.map(comment => (
          <CommentCard comment={comment} key={comment.id} onReply={handleReply} />
        ))}
      </div>

      <CommentForm articleId={articleId} ref={commentRef} />
    </>
  );
};

export default CommentList;
