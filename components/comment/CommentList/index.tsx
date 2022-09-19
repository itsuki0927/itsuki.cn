import { Plus } from 'react-feather';
import { ReactNode } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import MessageSvg from '@/components/icons/MessageSvg';
import CommentCard from '../CommentCard';
import { CommentTree } from '../CommentView/utils';
import Status from '@/components/ui/Status';

type CommentListProps = {
  className?: string;
  data?: CommentTree[];
  onClick?: () => void;
  header?: ReactNode;
};

const CommentList = ({ data, className, onClick, header }: CommentListProps) => {
  if (!data || !data?.length) {
    return (
      <Status
        className='mt-12'
        title='空空如也'
        icon={<MessageSvg />}
        description='我也想展示评论, 奈何数据库一条都没得'
      >
        <Status.Button className='mt-4' onClick={onClick}>
          <Plus size={16} className='mr-1' />
          <span>添加评论</span>
        </Status.Button>
      </Status>
    );
  }

  const renderHeader = () => {
    if (header) {
      return (
        <div className='flex items-center justify-between py-4 sm:flex-row sm:py-6'>
          {header}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {renderHeader()}
      <TransitionGroup className={className}>
        {data?.map(comment => (
          <CSSTransition key={comment.id} timeout={500} classNames='comment'>
            <CommentCard data={comment} key={comment.id} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </>
  );
};
//
export default CommentList;
