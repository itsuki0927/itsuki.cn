/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useMemo, useRef, useState } from 'react';
import { Container, Loading } from '@/components/ui';
import { initialCommentProfile, USER_COMMENT_PROFILE } from '@/constants/comment';
import { Comment, PostCommentBody } from '@/entities/comment';
import { useLocalStorage } from '@/hooks';
import { useComments, useCreateComment } from '@/hooks/comment';
import purifyDomString from '@/utils/purify';
import CommentForm from '../CommentForm';
import CommentList from '../CommentList';
import CommentProfile from '../CommentProfile';
import { convertToCommentTreeData } from './utils';
import { isEmail } from '@/utils/validate';
import CommentCard from '../CommentCard';

type CommentProps = {
  articleId: number;
};

const CommentView = ({ articleId }: CommentProps) => {
  const { data, isLoading, isFetching } = useComments(articleId);
  const [replyId, setReplyId] = useState<number | null>(null);
  const [profile, setProfile] = useLocalStorage(
    USER_COMMENT_PROFILE,
    initialCommentProfile
  );
  const mutation = useCreateComment(articleId);
  const comments = useMemo(() => convertToCommentTreeData(data?.data), [data?.data]);
  const hasComments = !!comments.length;

  const handleSend = useCallback(
    (content: string) =>
      new Promise<boolean>((resolve, reject) => {
        if (!content) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({ message: '老铁 内容呢?' });
          return;
        }
        if (!profile.email) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({ message: '邮箱?' });
          return;
        }
        if (!profile.nickname) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({ message: '昵称?' });
          return;
        }
        if (profile.nickname.length >= 10) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({ message: '昵称太长了' });
          return;
        }
        if (!isEmail(profile.email)) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({ message: '正确的邮箱?' });
          return;
        }
        const params: PostCommentBody = {
          ...profile,
          articleId,
          agent: navigator.userAgent,
          parentId: replyId ?? undefined,
          content: purifyDomString(content),
        };
        mutation.mutateAsync(params).then(() => {
          setReplyId(null);
          resolve(true);
        }, reject);
      }),
    [articleId, mutation, profile, replyId]
  );

  const replyCallback = useCallback(
    (comment: Comment) =>
      replyId === comment.id ? (
        <CommentForm
          className='mt-4'
          hiddenAvatar
          onSend={handleSend}
          profile={<CommentProfile value={profile} onChange={setProfile} />}
        />
      ) : null,
    [handleSend, profile, replyId, setProfile]
  );

  if (isLoading || isFetching) {
    return <Loading />;
  }

  return (
    <>
      <Container>
        <div className='overflow-hidden'>
          <h3 className='my-4 text-center text-sm font-bold tracking-widest text-dark-2 '>
            陈独秀请发言
          </h3>
          <CommentForm
            email={profile.email}
            onSend={handleSend}
            profile={<CommentProfile value={profile} onChange={setProfile} />}
          />
        </div>
      </Container>

      <Container className='my-6'>
        {hasComments ? (
          <>
            <h3 className='my-4 text-center text-sm font-bold tracking-widest text-dark-2 '>
              {data?.total} 条沙雕评论
            </h3>
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
          </>
        ) : (
          <p className='mb-0 text-center text-gray-2'>暂无评论</p>
        )}
      </Container>
    </>
  );
};

export default CommentView;
