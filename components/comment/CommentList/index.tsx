'use client';

import { ReactNode } from 'react';
import { Plus } from 'react-feather';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import CommentCard from '../CommentCard';
import { CommentTree } from '../CommentView/utils';
import MessageSvg from '@/components/icons/MessageSvg';
import Status from '@/components/ui/Status';

type CommentListProps = {
  className?: string;
  data?: CommentTree[];
  header?: ReactNode;
  renderEmpty?: () => JSX.Element;
};

export const defaultRenderEmpty = () => (
  <Status
    className='mt-12'
    title='空空如也'
    icon={<MessageSvg />}
    description='我也想展示评论, 奈何数据库一条都没得'
  >
    <Status.Button className='mt-4'>
      <Plus size={16} className='mr-1' />
      <span>添加评论</span>
    </Status.Button>
  </Status>
);

const CommentList = ({
  data,
  className,
  header,
  renderEmpty = defaultRenderEmpty,
}: CommentListProps) => {
  if (!data || !data?.length) {
    return renderEmpty?.();
  }

  const renderHeader = () => {
    if (header) {
      return (
        <div className='flex items-center justify-between px-4 py-4 sm:flex-row sm:px-0 sm:py-6'>
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
