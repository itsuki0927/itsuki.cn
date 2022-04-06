import { ReactNode } from 'react';
import { Comment } from '@/entities/comment';
import CommentCard from '../CommentCard';
// import { CommentTree } from '../CommentView';

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
};

const buildeCommentTree = (comments: Comment[]): Array<CommentTree> =>
  comments.map(comment => ({
    comment,
    children: [],
  }));

const CommentList = ({ data, className, childClassName, ...rest }: CommentListProps) => (
  <div className={`space-y-4 ${className}`}>
    {data?.map(item => (
      <CommentCard
        comment={item.comment}
        key={item.comment.id}
        className={childClassName}
        {...rest}
      >
        {item.children?.length ? (
          <CommentList
            className='ml-12'
            data={buildeCommentTree(item.children)}
            {...rest}
            childClassName='border-l-[5px] border-solid border-[#f2f2f2]'
          />
        ) : null}
      </CommentCard>
    ))}
  </div>
);
//
export default CommentList;
