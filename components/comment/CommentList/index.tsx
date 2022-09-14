import { Plus } from 'react-feather';
import { ReactNode } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import MessageSvg from '@/components/icons/MessageSvg';
import CommentCard from '../CommentCard';
import { CommentTree } from '../CommentView/utils';

type CommentListProps = {
  className?: string;
  data?: CommentTree[];
  onClick?: () => void;
  header?: ReactNode;
};

const CommentList = ({ data, className, onClick, header }: CommentListProps) => {
  if (!data || !data?.length) {
    return (
      <div className='mt-12 bg-gray-50 p-4 sm:p-6'>
        <MessageSvg />

        <div className='mt-2 text-xl font-medium text-gray-900'>空空如也</div>
        <div className='text-gray-600 '>我也想展示数据, 奈何数据库一条都没得</div>

        <button
          className='mt-4 flex items-center rounded-sm bg-primary px-6 py-[6px] text-sm text-white transition-colors hover:bg-primary-hover'
          type='button'
          onClick={onClick}
        >
          <Plus size={16} className='mr-1' />
          <span>添加评论</span>
        </button>
      </div>
    );
  }

  const renderHeader = () => {
    if (header) {
      return (
        <div className='flex items-center justify-between py-4 px-4 sm:flex-row sm:py-6 sm:px-0'>
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
