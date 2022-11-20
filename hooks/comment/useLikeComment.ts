import omit from 'lodash.omit';
import { useCallback, useState } from 'react';
import { likeComment as likeCommentApi } from '@/api/comment';
import { GAEventCategories } from '@/constants/gtag';
import { useAuth } from '@/libs/auth';
import { gtag } from '@/utils/gtag';
import { Comment } from '@/entities/comment';
import usePrevious from '../usePrevious';

type UseLikeCommentHook = {
  comment: Comment;
};

const useLikeComment = ({ comment }: UseLikeCommentHook) => {
  const [emojiMap, setEmojiMap] = useState(comment.emojiMap || {});
  const { user } = useAuth();
  const prevEmojiMap = usePrevious(emojiMap);
  const email = user?.email ?? '';

  const getLatestEmojiMap = useCallback(
    async (emoji: string) => {
      const emojiMap2 = emojiMap[emoji] || {};
      const value = emojiMap2[email] || 0;
      if (value) {
        const total = Object.keys(emojiMap2).reduce((r, k) => emojiMap2[k] + r, 0);
        // 如果总数只有1的话, 表示直接删除该emoji
        if (total === 1) return omit(emojiMap, emoji);
        // value == 1 删除该emoji下的email
        if (value === 1) return { ...emojiMap, [emoji]: omit(emojiMap2, email) };
        return {
          ...emojiMap,
          [emoji]: {
            ...emojiMap2,
            [email]: value - 1,
          },
        };
      }
      return {
        ...emojiMap,
        [emoji]: {
          ...emojiMap2,
          [email]: value + 1,
        },
      };
    },
    [emojiMap, email]
  );

  const likeComment = useCallback(
    async (emoji: string) => {
      if (!email) {
        return;
      }
      try {
        gtag.event('like_comment', {
          category: GAEventCategories.Comment,
        });
        const lastestEmojiMap = await getLatestEmojiMap(emoji);
        likeCommentApi(comment.id, JSON.stringify(lastestEmojiMap));
        setEmojiMap(lastestEmojiMap);
      } catch (err: any) {
        // rollback
        setEmojiMap(prevEmojiMap);
      }
    },
    [comment.id, email, getLatestEmojiMap, prevEmojiMap]
  );

  return { likeComment, emojiMap };
};

export default useLikeComment;
