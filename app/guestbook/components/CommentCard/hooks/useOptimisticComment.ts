import { useOptimistic } from 'react';
import { Comment, CommentEmoji } from '@/types/comment';

const useOptimisticComment = (comment: Comment) => {
  // TODO: bug
  const userEmail = '';

  return useOptimistic(comment, (state, newState: string) => {
    const emoji = (state.emoji || {}) as CommentEmoji;
    if (emoji[newState]) {
      if (emoji[newState].includes(userEmail)) {
        emoji[newState] = emoji[newState].filter((v) => v !== userEmail);
      } else {
        emoji[newState].push(userEmail);
      }
    } else {
      emoji[newState] = [userEmail];
    }
    return {
      ...state,
      emoji: { ...emoji },
    };
  });
};

export default useOptimisticComment;
