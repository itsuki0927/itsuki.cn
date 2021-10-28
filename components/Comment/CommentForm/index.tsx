import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { SendOutlined } from '@/components/icons';
import { Button, Card } from '@/components/ui';
import { initialCommentProfile } from '@/constants/comment';
import usePostComment from '@/framework/local/comment/use-post-comment';
import { getGravatarUrl } from '@/transformers/gravatar';
import { purifyDomString } from '@/transformers/purify';
import CommentProfile from '../CommentProfile';
import { useReply } from '../context';
import ReplyPlaceholder from '../ReplyPlaceholder';
import styles from './style.module.scss';

const DynamicMarkdown = dynamic(() => import('@/components/common/MarkdownEditor'), {
  ssr: false,
});

const noPadding = { padding: 0 };

interface CommentFormProps {
  articleId: number;
}
const CommentForm = ({ articleId }: CommentFormProps) => {
  const { setReply, reply } = useReply();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(initialCommentProfile);
  const postComment = usePostComment({ articleId });

  const handleCloseReply = () => setReply(undefined);

  const handleSend = async () => {
    if (!content) {
      alert('请输入评论内容');
      return;
    }
    try {
      setLoading(true);
      await postComment({
        ...profile,
        content: purifyDomString(content),
        articleId,
        agent: navigator.userAgent,
        parentId: reply?.id,
      });
      setContent('');
      handleCloseReply();
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
      // eslint-disable-next-line prefer-promise-reject-errors
    }
    setLoading(false);
  };

  return (
    <Card bodyStyle={noPadding} bordered={false}>
      <div className={styles.form}>
        <img
          className={styles.avatar}
          src={getGravatarUrl(profile.email)}
          width={80}
          height={80}
          alt='cover'
        />
        <div className={styles.wrapper}>
          <ReplyPlaceholder reply={reply} onCloseReply={handleCloseReply} />

          <CommentProfile value={profile} onChange={setProfile} />

          <Card className={styles.markdown} bordered={false} bodyStyle={{ padding: 0 }}>
            <DynamicMarkdown code={content} onChange={setContent} />

            <div className={styles.actionBar}>
              <Button
                type='primary'
                className={styles.send}
                icon={<SendOutlined />}
                disabled={loading}
                onClick={handleSend}
              >
                {loading ? '发射中...' : '发射'}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Card>
  );
};

export default CommentForm;
