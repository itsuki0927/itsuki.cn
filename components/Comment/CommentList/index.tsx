import { ReactNode } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Comment } from '@/entities/comment';
import CommentCard from '../CommentCard';

export type CommentTree = {
  comment: Comment;
  children: Comment[];
};

type CommentListProps = {
  className?: string;
  data?: CommentTree[];
  reply?: (comment: Comment) => ReactNode;
  onReply?: (comment: Comment) => void;
  childClassName?: string;
  commentClassName?: string;
};

const buildeCommentTree = (comments: Comment[]): Array<CommentTree> =>
  comments.map(comment => ({
    comment,
    children: [],
  }));

const CommentList = ({
  data,
  className,
  childClassName,
  commentClassName,
  ...rest
}: CommentListProps) => (
  <TransitionGroup className={`space-y-4 ${className}`}>
    {data?.map(item => (
      <CSSTransition key={item.comment.id} timeout={500} classNames='comment'>
        <CommentCard
          comment={item.comment}
          key={item.comment.id}
          childClassName={childClassName}
          {...rest}
        >
          {item.children?.length ? (
            <CommentList
              className='ml-12 mt-4'
              data={buildeCommentTree(item.children)}
              {...rest}
              childClassName='border-l-[5px] border-solid border-[#f2f2f2]'
            />
          ) : null}
        </CommentCard>
      </CSSTransition>
    ))}
  </TransitionGroup>
);
//
export default CommentList;
