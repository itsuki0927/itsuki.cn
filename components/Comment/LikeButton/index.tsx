import classNames from 'classnames';
import React, { useState } from 'react';
import { HeartFilled } from '@/components/icons';
import { Button } from '@/components/ui';
import useInLikeArticles from '@/framework/blog/article/use-in-like-articles';
import useLikeArticle from '@/framework/local/article/use-like-article';
import styles from './style.module.scss';

interface LikeButtonProps {
  articleId: number;
  liking: number;
}

const LikeButton = ({ articleId, liking: likingProp }: LikeButtonProps) => {
  const likeArticle = useLikeArticle();
  const initLiked = useInLikeArticles(articleId);
  const [liking, setLiking] = useState(likingProp);
  const [isLiked, setIsLiked] = useState(initLiked);

  return (
    <Button
      type='dashed'
      disabled={isLiked}
      icon={
        <HeartFilled
          className={classNames(styles.liking, {
            [styles.liked]: isLiked,
          })}
        />
      }
      onClick={() => {
        likeArticle({ articleId });
        setIsLiked(true);
        setLiking(v => v + 1);
      }}
    >
      {liking}
      个人
    </Button>
  );
};

export default LikeButton;
