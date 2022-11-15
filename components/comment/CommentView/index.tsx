import { useRouter } from 'next/navigation';
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
import MessageSvg from '@/components/icons/MessageSvg';
import { useAuth } from '@/libs/auth';
import GoogleIcon from '@/components/common/GoogleIcon';
import { LoadingDots } from '@/components/ui';

const getCommentTitleSuffixText = (blogId: number) =>
  blogId === GUESTBOOK ? '留言' : '评论';

type CommentProps = {
  blogId: number;
  className?: string;
};

const CommentView = ({ blogId, className = '' }: CommentProps) => {
  const { postComment, ...rest } = useCreateComment(blogId);
  const { user, loading } = useAuth();
  const { data, isLoading, isFetching, treeData, updateSort } = useComments(blogId);
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

  const renderCommentPublisher = () => {
    if (loading && !user) {
      return (
        <div className='bg-gray-50 p-6'>
          <LoadingDots />
        </div>
      );
    }
    if (user) {
      return (
        <CommentPublisher blogId={blogId} loading={rest.isLoading} onPost={postComment} />
      );
    }
    return (
      <Status
        icon={<SorrySvg />}
        title='请先登陆'
        description='仅使用你的邮箱、头像和昵称'
      >
        <div className='mt-4 flex space-x-3'>
          <GithubIcon />
          <GoogleIcon />
        </div>
      </Status>
    );
  };

  return (
    <div id={COMMENT_VIEW_ELEMENT_ID} className={className}>
      {renderCommentPublisher()}

      <CommentList
        className='space-y-8 sm:space-y-12'
        data={treeData}
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
              <strong className='text-primary'>{data?.total}</strong> 条
              {getCommentTitleSuffixText(blogId)}
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
