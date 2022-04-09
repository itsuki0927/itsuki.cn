import { useCallback, useMemo, useState } from 'react';
import { Container, Loading } from '@/components/ui';
import { initialCommentProfile, USER_COMMENT_PROFILE } from '@/constants/comment';
import { Comment, PostCommentBody } from '@/entities/comment';
import { useLocalStorage } from '@/hooks';
import { useComments, useCreateComment } from '@/hooks/comment';
import purifyDomString from '@/utils/purify';
import CommentForm from '../CommentForm';
import CommentList from '../CommentList';
import CommentProfile from '../CommentProfile';
import CommentReply from '../CommentReply';
import { convertToCommentTreeData } from './utils';

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

  const comments = useMemo(
    () => convertToCommentTreeData({ comments: data ?? [] }),
    [data]
  );

  const handleSend = useCallback(
    (content: string) =>
      new Promise<boolean>((resolve, reject) => {
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
        <div className='text-sm'>
          <CommentForm
            hiddenAvatar
            onSend={handleSend}
            reply={
              <CommentReply
                comment={comment}
                isReply
                onCloseReply={() => setReplyId(null)}
              />
            }
            profile={<CommentProfile value={profile} onChange={setProfile} />}
          />
        </div>
      ) : null,
    [handleSend, profile, replyId, setProfile]
  );

  if (isLoading || isFetching) {
    return <Loading />;
  }

  return (
    <Container>
      {!!comments?.length && (
        <h3 className='my-4 text-center text-sm font-bold tracking-widest text-dark-2 dark:text-dark-2--dark'>
          {comments?.length} 条沙雕评论
        </h3>
      )}
      <CommentList
        onReply={comment => setReplyId(comment.id)}
        reply={replyCallback}
        data={comments}
      />

      <div className='overflow-hidden'>
        <h3 className='my-4 text-center text-sm font-bold tracking-widest text-dark-2 dark:text-dark-2--dark'>
          陈独秀请发言
        </h3>
        <CommentForm
          onSend={handleSend}
          profile={<CommentProfile value={profile} onChange={setProfile} />}
        />
      </div>
    </Container>
  );
};

export default CommentView;
