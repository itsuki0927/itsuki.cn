import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Comment } from '@/entities/comment';

type CommentListProps = {
  className?: string;
  data?: Comment[];
  itemRender?: (data: Comment, index: number) => JSX.Element;
};

const CommentList = ({ data, className, itemRender }: CommentListProps) => (
  <TransitionGroup className={`space-y-8 ${className}`}>
    {data?.map((item, index) => (
      <CSSTransition key={item.id} timeout={500} classNames='comment'>
        {itemRender?.(item, index)}
      </CSSTransition>
    ))}
  </TransitionGroup>
);
//
export default CommentList;
