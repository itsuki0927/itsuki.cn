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
import { GithubIcon } from '@/components/common';
import SorrySvg from '@/components/icons/SorrySvg';
import Status from '@/components/ui/Status';
import { GithubOutlined } from '@/components/icons';

const getCommentTitleSuffixText = (articleId: number) =>
  articleId === GUESTBOOK ? '留言板' : '评论区';

type CommentProps = {
  articleId: number;
  className?: string;
};

const CommentView = ({ articleId, className = '' }: CommentProps) => {
  const { postComment, ...rest } = useCreateComment(articleId);
  const { data: session } = useSession();
  const { data, isLoading, isFetching, treeData, updateSort } = useComments(articleId);
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
    <div id={COMMENT_VIEW_ELEMENT_ID} className={className}>
      {session?.user ? (
        <CommentPublisher
          articleId={articleId}
          loading={rest.isLoading}
          onPost={postComment}
        />
      ) : (
        <Status
          icon={<SorrySvg />}
          title='请先登陆'
          description='仅使用你的邮箱、头像和昵称'
        >
          <GithubIcon className='mt-4 block'>
            <span className='inline-flex items-center rounded-sm bg-github px-4 py-2 text-sm text-white opacity-90 transition-opacity hover:opacity-100'>
              <GithubOutlined className='mr-1' />
              <span>Github</span>
            </span>
          </GithubIcon>
        </Status>
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
            <SortSelect
              value={sort}
              onChange={params => {
                updateSort(params.value);
                setSort(params);
              }}
            />
          </>
        }
      />
    </div>
  );
};

export default CommentView;
