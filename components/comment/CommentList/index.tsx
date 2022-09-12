import { CSSTransition, TransitionGroup } from 'react-transition-group';
import CommentCard from '../CommentCard';
import { CommentTree } from '../CommentView/utils';

type CommentListProps = {
  className?: string;
  data?: CommentTree[];
};

const CommentList = ({ data, className }: CommentListProps) => (
  <TransitionGroup className={className}>
    {data?.map(comment => (
      <CSSTransition key={comment.id} timeout={500} classNames='comment'>
        <CommentCard data={comment} key={comment.id} />
      </CSSTransition>
    ))}
  </TransitionGroup>
);
//
export default CommentList;
