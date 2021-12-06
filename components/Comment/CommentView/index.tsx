import React, { ReactNode, useMemo } from 'react';
import { Card, Empty } from '@/components/ui';
import { Comment } from '@/entities/comment';
import useInLikeArticles from '@/framework/blog/article/use-in-like-articles';
import useLikeArticle from '@/framework/local/article/use-like-article';
import useComment from '@/framework/local/comment/use-comment';
import { CommentSkeleton } from '..';
import CommentForm from '../CommentForm';
import CommentItem from '../CommentItem';
import { ReplyProvider } from '../context';
import LikeButton from '../LikeButton';
import styles from './style.module.scss';

type CommentProps = {
  title: (comments: Comment[], length: number) => string | ReactNode;
  liking: number;
  articleId: number;
};

const CommentList = ({ title, liking: likingProp, articleId }: CommentProps) => {
  const { data: comments, isEmpty, isLoading } = useComment({ articleId });
  const isLiked = useInLikeArticles(articleId);
  const likeArticles = useLikeArticle();

  const commentListDom = useMemo(
    () =>
      isEmpty || !comments ? (
        <Empty />
      ) : (
        comments.map(item => <CommentItem comment={item} key={item.id} />)
      ),
    [comments, isEmpty]
  );

  const handleLikeArticle = () => {
    likeArticles({ articleId });
  };

  if (isLoading || !comments) {
    return <CommentSkeleton />;
  }

  return (
    <ReplyProvider>
      <Card
        className={styles.comment}
        title={title(comments, comments.length)}
        extra={
          <LikeButton liking={likingProp} isLiked={isLiked} onLiked={handleLikeArticle}>
            {({ liking }) => `${liking}个人`}
          </LikeButton>
        }
      >
        {commentListDom}

        <CommentForm articleId={articleId} />
      </Card>
    </ReplyProvider>
  );
};

export default CommentList;
