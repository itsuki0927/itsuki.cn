import { getComments } from '@/api/comment';
import CommentList from '@/components/comment/CommentList';
import MessageSvg from '@/components/icons/MessageSvg';
import Status from '@/components/ui/Status';
import { COMMENT_VIEW_ELEMENT_ID } from '@/constants/anchor';
import { GUESTBOOK } from '@/constants/value';
import CommentPublisher from '../CommentPublisher';

interface CommentViewProps {
  blogId: number;
  className?: string;
}

const getCommentTitleSuffixText = (blogId: number) =>
  blogId === GUESTBOOK ? '留言' : '评论';

const CommentView = async ({ blogId, className = '' }: CommentViewProps) => {
  const comments = await getComments({ blogId });

  return (
    <div id={COMMENT_VIEW_ELEMENT_ID} className={className}>
      <CommentPublisher blogId={blogId} />

      <CommentList
        className='space-y-8 sm:space-y-12'
        data={comments.data}
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
              <strong className='text-primary'>{comments.total}</strong> 条
              {getCommentTitleSuffixText(blogId)}
            </span>
          </>
        }
      />
    </div>
  );
};

export default CommentView;
