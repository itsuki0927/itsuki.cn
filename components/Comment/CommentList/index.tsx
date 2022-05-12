import { ReactNode } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Comment } from '@/entities/comment';

export type CommentTree = {
  comment: Comment;
  children: Comment[];
};

type CommentListProps = {
  className?: string;
  children: (comment: CommentTree, itemClassName?: string) => ReactNode;
  data?: CommentTree[];
  childClassName?: string;
};

export const buildeCommentTree = (comments: Comment[]): Array<CommentTree> =>
  comments.map(comment => ({
    comment,
    children: [],
  }));

const CommentList = ({ data, className, childClassName, children }: CommentListProps) => (
  <TransitionGroup className={`space-y-4 ${className}`}>
    {data?.map(item => (
      <CSSTransition key={item.comment.id} timeout={500} classNames='comment'>
        {children(item, childClassName)}
      </CSSTransition>
    ))}
  </TransitionGroup>
);
//
export default CommentList;
