import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { COMMENT_VIEW_ELEMENT_ID } from '@/constants/anchor';
import { GUESTBOOK } from '@/constants/value';
import { useScrollTo } from '@/hooks';
import { useComments, useCreateComment } from '@/hooks/comment';
import CommentList from '../CommentList';
import { CommentFormSkeletion, CommentListSkeleton } from '../CommentSkeleton';
import CommentPublisher from '../CommentPublisher';
import SortSelect, { SortItem, sortList } from '@/components/ui/SortSelect';
import { SigninIcon } from '@/components/common';
import SorrySvg from '@/components/icons/SorrySvg';

const getCommentTitleSuffixText = (articleId: number) =>
  articleId === GUESTBOOK ? '留言板' : '评论区';

type CommentProps = {
  articleId: number;
};

const CommentView = ({ articleId }: CommentProps) => {
  const { postComment, ...rest } = useCreateComment(articleId);
  const { data: session } = useSession();
  const { data, isLoading, isFetching, treeData } = useComments(articleId);
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
        <div className='mt-12 bg-gray-50 p-4 sm:p-6'>
          <SorrySvg />

          <div className='mt-2 text-xl font-medium text-gray-900'>请先登陆</div>
          <div className='text-gray-600 '>仅使用你的邮箱、头像和昵称</div>

          <SigninIcon />
        </div>
      )}

      <CommentList
        className='space-y-8 sm:space-y-12'
        data={treeData}
        onClick={() => {
          toast.loading('聚焦输入框的点击事件正在实现的路上...');
        }}
        header={
          <>
            <span>
              <strong className='text-primary'>{data?.total}</strong> 条
              {getCommentTitleSuffixText(articleId)}
            </span>
            <SortSelect value={sort} onChange={setSort} />
          </>
        }
      />
    </div>
  );
};

export default CommentView;
