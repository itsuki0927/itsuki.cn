import CommentList from '@/components/comment/CommentList';
import { CommentTree } from '@/components/comment/CommentView/utils';
import MessageSvg from '@/components/icons/MessageSvg';
import Status from '@/components/ui/Status';
import { COMMENT_VIEW_ELEMENT_ID } from '@/constants/anchor';
import { GUESTBOOK } from '@/constants/value';
import CommentPublisherUI from './CommentPublisher';

interface CommentViewProps {
  comments: CommentTree[];
  total: number;
  blogId: number;
  className?: string;
}

const getCommentTitleSuffixText = (blogId: number) =>
  blogId === GUESTBOOK ? '留言' : '评论';

const CommentView = ({ comments, total, blogId, className = '' }: CommentViewProps) => (
  <div id={COMMENT_VIEW_ELEMENT_ID} className={className}>
    <CommentPublisherUI blogId={blogId} />

    <CommentList
      className='space-y-8 sm:space-y-12'
      data={comments}
      renderEmpty={
        <Status
          className='mt-12'
          title='空空如也'
          icon={<MessageSvg />}
          description='我也想展示评论, 奈何数据库一条都没得'
        />
      }
      header={
        <>
          <span>
            <strong className='text-primary'>{total}</strong> 条
            {getCommentTitleSuffixText(blogId)}
          </span>
        </>
      }
    />
  </div>
);

export default CommentView;
