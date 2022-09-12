import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import { SigninIcon } from '@/components/common';
import { COMMENT_VIEW_ELEMENT_ID } from '@/constants/anchor';
import { GAEventCategories } from '@/constants/gtag';
import { GUESTBOOK } from '@/constants/value';
import { Comment } from '@/entities/comment';
import { useScrollTo } from '@/hooks';
import { useComments, useCreateComment } from '@/hooks/comment';
import { gtag } from '@/utils/gtag';
import CommentCard from '../CommentCard';
import CommentForm from '../CommentForm';
import CommentList from '../CommentList';
import { CommentFormSkeletion, CommentListSkeleton } from '../CommentSkeleton';
import { ReplyProvider } from '../context';

const getCommentTitleSuffixText = (articleId: number) =>
  articleId === GUESTBOOK ? '留言板' : '评论区';

type CommentProps = {
  articleId: number;
};

const CommentView = ({ articleId }: CommentProps) => {
  const mutation = useCreateComment(articleId);
  const { data: session } = useSession();
  const { data, isLoading, isFetching, isEmpty } = useComments(articleId);
  const { pathname, asPath } = useRouter();
  const { scrollTo } = useScrollTo();

  useEffect(() => {
    const currentRouteCommentId = asPath.replace(pathname, '');
    console.log('currentRouteCommentId', currentRouteCommentId);
    if (
      ['/guestbook'].includes(pathname) &&
      currentRouteCommentId &&
      currentRouteCommentId.startsWith('#')
    ) {
      scrollTo(currentRouteCommentId);
    }
  }, [asPath, pathname, scrollTo]);

  const handleSend = useCallback(
    (params: any) => {
      gtag.event('push_comment', {
        category: GAEventCategories.Comment,
        label: `article_id: ${articleId}`,
      });
      return toast
        .promise(mutation.mutateAsync(params), {
          loading: '发射中...',
          success: <b>👏 发射成功</b>,
          error: <b>🙌 发射失败</b>,
        })
        .then(
          () => true,
          () => false
        );
    },
    [articleId, mutation]
  );

  const commentRender = useCallback(
    (comment: Comment) => <CommentCard data={comment} key={comment.id} />,
    []
  );

  if (isLoading || isFetching) {
    return (
      <>
        <CommentFormSkeletion />
        <CommentListSkeleton />
      </>
    );
  }

  return (
    <div id={COMMENT_VIEW_ELEMENT_ID}>
      <div className='my-4 mb-12 rounded-sm border border-solid border-primary bg-primary-light p-6'>
        <h5 className='my-1 text-lg font-bold text-gray-900 dark:text-gray-100 md:text-xl'>
          {getCommentTitleSuffixText(articleId)}
        </h5>
        <p className='text-sm text-gray-800'>在这里留下你的足迹吧~</p>
        {session?.user ? (
          <div className='my-4'>
            <CommentForm
              articleId={articleId}
              loading={mutation.isLoading}
              onSend={handleSend}
            />
          </div>
        ) : (
          <SigninIcon />
        )}
        <p className='text-sm text-gray-800'>仅使用你的邮箱、头像、昵称.</p>
      </div>

      {!isEmpty && (
        <CommentList className='space-y-4' data={data?.data} itemRender={commentRender} />
      )}
    </div>
  );
};

const CommentViewUI = (props: CommentProps) => (
  <ReplyProvider>
    <CommentView {...props} />
  </ReplyProvider>
);

export default CommentViewUI;
