import React, { useRef } from 'react';
import { Comment } from '@/entities/comment';
import CommentForm, { CommentFormRef } from '../CommentForm';
import CommentList from '../CommentList';
import { useComments } from '@/hooks/comment';

type CommentProps = {
  articleId: number;
};

const CommentView = ({ articleId }: CommentProps) => {
  const comments = useComments(articleId);
  const commentRef = useRef<CommentFormRef>(null);

  const handleReply = (reply: Comment) => {
    commentRef.current?.setReply(reply);
  };

  return (
    <>
      <CommentList {...comments} onReply={handleReply} />

      <CommentForm articleId={articleId} ref={commentRef} />
    </>
  );
};

export default CommentView;
