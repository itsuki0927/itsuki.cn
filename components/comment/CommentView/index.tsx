import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { SigninIcon } from '@/components/common';
import { COMMENT_VIEW_ELEMENT_ID } from '@/constants/anchor';
import { GUESTBOOK } from '@/constants/value';
import { useScrollTo } from '@/hooks';
import { useComments, useCreateComment } from '@/hooks/comment';
import CommentList from '../CommentList';
import { CommentFormSkeletion, CommentListSkeleton } from '../CommentSkeleton';
import { convertToCommentTreeData } from './utils';
import CommentPublisher from '../CommentPublisher';
import SortSelect, { SortItem, sortList } from '@/components/ui/SortSelect';

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
  const [sort, setSort] = useState<SortItem>(sortList[0]);

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
      {session?.user ? (
        <div className='pt-12'>
          <CommentPublisher
            articleId={articleId}
            loading={rest.isLoading}
            onPost={postComment}
          />
        </div>
      ) : (
        <div className='pt-12'>
          <SigninIcon />
        </div>
      )}

      <div className='flex items-center justify-between px-4 py-6 sm:flex-row sm:px-0'>
        <span>
          <strong>{data?.total}</strong> 条{getCommentTitleSuffixText(articleId)}
        </span>

        <SortSelect value={sort} onChange={setSort} />
      </div>

      {!isEmpty && <CommentList className='space-y-12' data={commentTreeData} />}
    </div>
  );
};

export default CommentView;
