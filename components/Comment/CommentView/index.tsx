import React, { useState } from 'react';
import { Card, Empty } from '@/components/ui';
import { initialCommentProfile } from '@/constants/comment';
import { Comment } from '@/entities/comment';
import useComment from '@/framework/local/comment/use-comment';
import usePostComment from '@/framework/local/comment/use-post-comment';
import purifyDomString from '@/utils/purify';
import { CommentSkeleton } from '..';
import CommentCard from '../CommentCard';
import CommentForm, {
  CommentFormAvatar,
  CommentFormContent,
  CommentFormEditor,
  CommentFormProfile,
  CommentFormReply,
  CommentFormSubmit,
} from '../CommentForm';
import { CommentProfileType } from '../CommentForm/CommentFormProfile';
import styles from './style.module.scss';

type CommentProps = {
  articleId: number;
};

const CommentList = ({ articleId }: CommentProps) => {
  const { data: comments, isEmpty, isLoading } = useComment({ articleId });
  const [reply, setReply] = useState<Comment>();
  const [profile, setProfile] = useState<CommentProfileType>(initialCommentProfile);
  const [content, setContent] = useState('');
  const postComment = usePostComment({ articleId });

  const handleSend = async () => {
    if (!content) {
      alert('请输入评论内容');
      return Promise.resolve(false);
    }
    try {
      await postComment({
        ...profile,
        content: purifyDomString(content),
        articleId,
        agent: navigator.userAgent,
        parentId: reply?.id,
      });
      setReply(undefined);
      setContent('');
      return true;
    } catch (error: any) {
      const [{ message }] = error.errors;
      alert(`评论发布失败: ${message}\n`);
      // alert(
      //   `评论发布失败\n
      //  1：检查邮箱是否符合格式\n
      //  2：被 Akismet 过滤\n
      //  3：邮箱/IP 被列入黑名单\n
      //  4：内容包含黑名单关键词\n
      //   `
      // );
      return false;
    }
  };

  if (isLoading || !comments) {
    return <CommentSkeleton />;
  }

  return (
    <>
      <Card className={styles.comment}>
        {isEmpty || !comments ? (
          <Empty />
        ) : (
          comments.map(item => (
            <CommentCard comment={item} key={item.id} onReply={setReply} />
          ))
        )}
      </Card>

      <CommentForm onSend={handleSend}>
        <CommentFormAvatar email={profile.email} />
        <CommentFormContent>
          <CommentFormReply reply={reply} onCloseReply={() => setReply(undefined)} />
          <CommentFormProfile value={profile} onChange={setProfile} />
          <CommentFormEditor code={content} onChange={setContent} />
          <CommentFormSubmit onSend={handleSend} />
        </CommentFormContent>
      </CommentForm>
    </>
  );
};

export default CommentList;
