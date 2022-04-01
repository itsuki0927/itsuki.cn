import React, { useRef } from 'react';
import { Comment } from '@/entities/comment';
import CommentCard from '../CommentCard';
import CommentForm, { CommentFormRef } from '../CommentForm';
import { useComments } from '@/hooks/comment';
import HijackRender from '@/components/common/HijackRender';
import CommentSkeleton from '../CommentSkeleton';

type CommentProps = {
  articleId: number;
};

const CommentList = ({ articleId }: CommentProps) => {
  const comments = useComments(articleId);
  const commentRef = useRef<CommentFormRef>(null);

  const handleReply = (reply: Comment) => {
    commentRef.current?.setReply(reply);
  };

  return (
    <>
      <HijackRender<Comment[]>
        {...comments}
        loadingContent={<CommentSkeleton />}
        className='space-y-4 bg-white p-4'
      >
        {comments.data?.map(comment => (
          <CommentCard comment={comment} key={comment.id} onReply={handleReply} />
        ))}
      </HijackRender>

      <CommentForm articleId={articleId} ref={commentRef} />
    </>
  );
};

export default CommentList;
