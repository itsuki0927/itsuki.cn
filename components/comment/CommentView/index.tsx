import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { SigninIcon } from '@/components/common';
import { COMMENT_VIEW_ELEMENT_ID } from '@/constants/anchor';
import { GUESTBOOK } from '@/constants/value';
import { useScrollTo } from '@/hooks';
import { useComments, useCreateComment } from '@/hooks/comment';
import CommentList from '../CommentList';
import { CommentFormSkeletion, CommentListSkeleton } from '../CommentSkeleton';
import { convertToCommentTreeData } from './utils';
import CommentPublisher from '../CommentPublisher';

const getCommentTitleSuffixText = (articleId: number) =>
  articleId === GUESTBOOK ? '留言板' : '评论区';

type CommentProps = {
  articleId: number;
};

const CommentView = ({ articleId }: CommentProps) => {
  const { postComment, ...rest } = useCreateComment(articleId);
  const { data: session } = useSession();
  const { data, isLoading, isFetching, isEmpty } = useComments(articleId);
  const commentTreeData = useMemo(
    () => convertToCommentTreeData(data?.data ?? []),
    [data?.data]
  );
  const { pathname, asPath } = useRouter();
  const { scrollTo } = useScrollTo();

  useEffect(() => {
    const currentRouteCommentId = asPath.replace(pathname, '');
    if (
      ['/guestbook'].includes(pathname) &&
      currentRouteCommentId &&
      currentRouteCommentId.startsWith('#')
    ) {
      scrollTo(currentRouteCommentId);
    }
  }, [asPath, pathname, scrollTo]);

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
            <CommentPublisher
              articleId={articleId}
              loading={rest.isLoading}
              onPost={postComment}
            />
          </div>
        ) : (
          <SigninIcon />
        )}
        <p className='text-sm text-gray-800'>仅使用你的邮箱、头像、昵称.</p>
      </div>

      {!isEmpty && <CommentList className='space-y-12' data={commentTreeData} />}
    </div>
  );
};

export default CommentView;
