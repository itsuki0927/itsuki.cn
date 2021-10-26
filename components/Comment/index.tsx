import { ReactNode, useEffect, useState } from 'react';
import { postComment } from '@/api/comment';
import { Card, Empty } from '@/components/ui';
import { Comment } from '@/entities/comment';
import useComment from '@/framework/local/comment/use-comment';
import { purifyDomString } from '@/transformers/purify';
import CommentContext from './context';
import Editor from './Editor';
import { CommentProfileType } from './Editor/Profile';
import CommentCard from './Item';
import LikeButton from './LikeButton';
import styles from './style.module.scss';

type CommentProps = {
  title: (comments: Comment[], length: number) => string | ReactNode;
  liking: number;
  articleId: number;
};

const CommentList = ({ title, liking, articleId }: CommentProps) => {
  const [reply, setReply] = useState<Comment | undefined>();
  const { mutate, data: comments, isEmpty, isLoading } = useComment({ articleId });

  useEffect(() => {
    mutate();
  }, [articleId, mutate]);

  if (isLoading || !comments) {
    return <h1>Loading.....</h1>;
  }

  const handleSend = ({ content, ...data }: CommentProfileType & { content: string }) =>
    postComment({
      ...data,
      content: purifyDomString(content),
      articleId,
      agent: navigator.userAgent,
      parentId: reply?.id,
    })
      .then(async () => {
        await mutate();
        return true;
      })
      .catch(() => {
        alert(
          `评论发布失败\n
          1：检查邮箱是否符合格式\n
          2：被 Akismet 过滤\n
          3：邮箱/IP 被列入黑名单\n
          4：内容包含黑名单关键词\n
           `
        );
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject('评论失败');
      });

  return (
    <CommentContext.Provider value={{ reply, setReply }}>
      <Card
        className={styles.comment}
        title={title(comments, comments.length)}
        extra={<LikeButton articleId={articleId} liking={liking} />}
      >
        {isEmpty ? (
          <Empty />
        ) : (
          comments.map(item => <CommentCard comment={item} key={item.id} />)
        )}
        <Editor onSend={handleSend} />
      </Card>
    </CommentContext.Provider>
  );
};

export default CommentList;
