import { useSession } from 'next-auth/react';
import React, { useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SigninIcon } from '@/components/common';
import { Empty, Widget } from '@/components/ui';
import { GAEventCategories } from '@/constants/gtag';
import { useComments, useCreateComment } from '@/hooks/comment';
import { gtag } from '@/utils/gtag';
import CommentForm from '../CommentForm';
import CommentList from '../CommentList';
import { CommentFormSkeletion, CommentListSkeleton } from '../CommentSkeleton';
import { ReplyProvider, useReply } from '../context';
import { convertToCommentTreeData } from './utils';

type CommentProps = {
  articleId: number;
};

const CommentView = ({ articleId }: CommentProps) => {
  const mutation = useCreateComment(articleId);
  const { reply } = useReply();
  const { data: session } = useSession();
  const { data, isLoading, isFetching, isEmpty } = useComments(articleId);
  const comments = useMemo(() => convertToCommentTreeData(data?.data), [data?.data]);

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

  const commentFormDom = useMemo(
    () => (
      <CommentForm
        articleId={articleId}
        loading={mutation.isLoading}
        onSend={handleSend}
      />
    ),
    [articleId, handleSend, mutation.isLoading]
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
    <>
      <Widget>
        <Widget.Header>留下你的足迹</Widget.Header>

        {session?.user ? (
          <div className='my-4'>{commentFormDom}</div>
        ) : (
          <div className='my-2 space-y-3'>
            <p className='text-center text-sm text-gray-2'>仅使用你的邮箱、头像、昵称.</p>
            <SigninIcon />
            <p className='text-center text-sm text-gray-1'>(请先登录)</p>
          </div>
        )}
      </Widget>

      {isEmpty ? (
        <Empty />
      ) : (
        <Widget>
          <Widget.Header>{data?.total} 条沙雕评论</Widget.Header>
          <CommentList className='space-y-4' data={comments}>
            {comment =>
              reply?.id === comment.id
                ? React.cloneElement(commentFormDom, {
                    hiddenLogout: true,
                    hiddenAvatar: true,
                    className: 'mt-4',
                  })
                : null
            }
          </CommentList>
        </Widget>
      )}
    </>
  );
};

const CommentViewUI = (props: CommentProps) => (
  <ReplyProvider>
    <CommentView {...props} />
  </ReplyProvider>
);

export default CommentViewUI;
