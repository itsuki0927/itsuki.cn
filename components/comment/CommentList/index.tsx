import { ReactNode } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Comment } from '@/entities/comment';
import CommentCard from '../CommentCard';

export type CommentTree = {
  comment: Comment;
  children: Comment[];
};

type CommentListProps = {
  className?: string;
  data?: CommentTree[];
  childClassName?: string;
  children?: (comment: Comment) => ReactNode;
};

export const buildCommentTree = (comments: Comment[]): Array<CommentTree> =>
  comments.map(comment => ({
    comment,
    children: [],
  }));

const CommentList = ({ data, className, childClassName, children }: CommentListProps) => (
  <TransitionGroup className={`space-y-4 ${className}`}>
    {data?.map(item => (
      <CSSTransition key={item.comment.id} timeout={500} classNames='comment'>
        <CommentCard key={item.comment.id} className={childClassName} data={item}>
          {children?.(item.comment)}

          {!!item.children.length && (
            <CommentList
              // eslint-disable-next-line react/no-children-prop
              children={children}
              className='mt-4'
              childClassName='ml-12'
              data={buildCommentTree(item.children)}
            />
          )}
        </CommentCard>
      </CSSTransition>
    ))}
  </TransitionGroup>
);
//
export default CommentList;
