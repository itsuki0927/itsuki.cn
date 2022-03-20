import classNames from 'classnames';
import { HeartFilled, HeartOutlined, Icon } from '@/components/icons';
import { Button, IconButton, MarkdownBlock } from '@/components/ui';
import { Comment } from '@/entities/comment';
import useLikeComment from '@/framework/local/comment/use-like-comment';
import { NoReturnFunction } from '@/types/fn';
import getGravatarUrl from '@/utils/gravatar';
import markedToHtml from '@/utils/marked';
import scrollTo from '@/utils/scrollTo';

export const buildCommentDomId = (id: number) => `comment-${id}`;

interface CommentCardCommonProps {
  comment: Comment;
}

interface CommentCardProps extends CommentCardCommonProps {
  onReply: NoReturnFunction<Comment>;
}
const CommentCard = ({ comment, onReply }: CommentCardProps) => {
  const contentHtml = markedToHtml(comment.content, { purify: true });
  const likeComment = useLikeComment({ articleId: comment.articleId });

  const handleLikeComment = () => {
    if (comment.isLike) return;
    likeComment({ commentId: comment.id });
  };

  return (
    <div
      id={buildCommentDomId(comment.id)}
      key={comment.id}
      className='relative rounded-sm pl-8'
    >
      <img
        src={getGravatarUrl(comment.email)}
        width={60}
        height={60}
        className='border-gray-200 border-4 border-solid absolute left-0 top-4'
        alt='avatar'
      />

      <div className='bg-gray-50 transition-colors p-2 pl-12 hover:bg-gray-100'>
        <div className='flex items-center'>
          <span className='font-bold inline-block text-sm text-gray-600'>
            <strong>{comment.nickname}</strong>
          </span>

          <span className='text-sm ml-2 text-gray-400'>
            {comment.province} - {comment.city}
          </span>

          <span className='flex-grow text-right text-sm text-gray-300'>
            {new Date(comment.createAt).toLocaleTimeString()}
          </span>
        </div>

        {!!comment.parentId && (
          <p className='text-gray-400 text-sm m-0'>
            @
            <Button
              className='bg-transparent text-gray-300 align-middle transition-colors hover:text-gray-400'
              size='small'
              type='text'
              onClick={() => {
                scrollTo(`#${buildCommentDomId(comment.parentId)}`, 400, {
                  offset: -64,
                });
              }}
            >
              {comment.parentNickName}
            </Button>
          </p>
        )}

        <MarkdownBlock
          className='my-1 max-h-[600px] overflow-y-scroll comment'
          htmlContent={contentHtml}
        />

        <div className='flex justify-end'>
          <IconButton
            size='small'
            type='ghost'
            icon={
              comment.isLike ? <HeartFilled className='text-error' /> : <HeartOutlined />
            }
            onClick={handleLikeComment}
            className={classNames(
              'text-gray-300 bg-transparent ml-3 transition-colors hover:text-error',
              {
                'text-error': comment.isLike,
              }
            )}
          >
            {comment.liking}人点赞
          </IconButton>
          <IconButton
            size='small'
            type='ghost'
            icon={<Icon name='thunderbolt' />}
            className='text-gray-300 bg-transparent ml-3 transition-colors'
            onClick={() => {
              onReply(comment);
              // scrollTo(`#commentForm`, 200, {
              //   offset: 64,
              // });
            }}
          >
            回复
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
