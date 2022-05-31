import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { SigninIcon } from '@/components/common';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Empty, Widget } from '@/components/ui';
import { Comment, PostCommentBody } from '@/entities/comment';
import { useComments, useCreateComment } from '@/hooks/comment';
import purifyDomString from '@/libs/purify';
import CommentCard from '../CommentCard';
import CommentForm from '../CommentForm';
import CommentList from '../CommentList';
import { CommentFormSkeletion, CommentListSkeleton } from '../CommentSkeleton';
import SendButton from '../SendButton';
import { convertToCommentTreeData } from './utils';
import { gtag } from '@/utils/gtag';
import { GAEventCategories } from '@/constants/gtag';
import { useGlobalData } from '@/hooks/globalData';

const DynamicMarkdown = dynamic(() => import('@/components/common/MarkdownEditor'), {
  ssr: false,
});

type CommentProps = {
  articleId: number;
};

const CommentView = ({ articleId }: CommentProps) => {
  const { data: globalData } = useGlobalData();
  const router = useRouter();
  const loginType = String(router.query?.type ?? 'github');

  const { data: session } = useSession();
  const { data, isLoading, isFetching, isEmpty } = useComments(articleId);
  const [replyId, setReplyId] = useState<number | null>(null);
  const [content, setContent] = useState('');
  const mutation = useCreateComment(articleId);
  const comments = useMemo(() => convertToCommentTreeData(data?.data), [data?.data]);
  const blacklist = globalData?.blacklist;

  const ensureCommentCanPush = useCallback(() => {
    const sensitiveKeyword = blacklist?.keyword.find(k => content.includes(k));
    if (sensitiveKeyword) {
      toast.error(`老铁, 评论内容有敏感词: ${sensitiveKeyword}\n`, {
        duration: 2500,
      });
      return false;
    }
    if (blacklist?.email.includes(session?.user?.email ?? '')) {
      toast.error(`老铁, 做了坏事情, 被拉黑了\n`, {
        duration: 2500,
      });
      return false;
    }
    if (!content) {
      toast.error(`老铁, 内容呢?\n`);
      return false;
    }

    return true;
  }, [blacklist?.email, blacklist?.keyword, content, session?.user?.email]);

  const handleSend = useCallback(
    () =>
      new Promise<boolean>((resolve, reject) => {
        if (session?.user) {
          const email = session.user.email ?? '';
          const avatar = session.user.image ?? '';
          const nickname = session.user.name ?? '';
          const params: PostCommentBody = {
            articleId,
            loginType,
            email,
            avatar,
            nickname,
            agent: navigator.userAgent,
            parentId: replyId ?? undefined,
            content: purifyDomString(content),
          };

          if (ensureCommentCanPush()) {
            gtag.event('push_comment', {
              category: GAEventCategories.Comment,
              label: `article_id: ${articleId}`,
            });

            toast
              .promise(mutation.mutateAsync(params), {
                loading: '发射中...',
                success: <b>👏 发射成功</b>,
                error: <b>🙌 发射失败</b>,
              })
              .then(() => {
                setContent('');
                setReplyId(null);
                resolve(true);
              }, reject);
          }
        }
      }),
    [
      session?.user,
      articleId,
      loginType,
      replyId,
      content,
      ensureCommentCanPush,
      mutation,
    ]
  );

  const commentformDom = useMemo(
    () => (
      <CommentForm loginType={loginType} avatar={session?.user?.image}>
        <DynamicMarkdown
          className='flex-grow'
          code={content}
          onChange={setContent}
          placeholder='见解(必填)'
        >
          <SendButton
            onConfirm={handleSend}
            isLoading={mutation.isLoading}
            nickname={session?.user?.name}
          />
        </DynamicMarkdown>
      </CommentForm>
    ),
    [
      content,
      handleSend,
      mutation.isLoading,
      loginType,
      session?.user?.image,
      session?.user?.name,
    ]
  );

  const replyCallback = useCallback(
    (comment: Comment) =>
      replyId === comment.id
        ? React.cloneElement(commentformDom, {
            className: 'mt-4',
            hiddenLogout: true,
          })
        : null,
    [commentformDom, replyId]
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
          <div className='my-4'>{commentformDom}</div>
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
          <CommentList data={comments}>
            {(item, childClassName) => (
              <CommentCard
                replyId={replyId}
                onReply={comment => setReplyId(comment.id)}
                onCancelReply={() => setReplyId(null)}
                reply={replyCallback}
                key={item.comment.id}
                data={item}
                childClassName={childClassName}
              />
            )}
          </CommentList>
        </Widget>
      )}
    </>
  );
};

export default CommentView;
