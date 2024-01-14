import { useOptimistic } from "react";
import { useSession } from "next-auth/react";
import { Comment, CommentEmoji } from "@/types/comment";

const useOptimisticComment = (comment: Comment) => {
  const { data: session } = useSession();
  const user = session?.user;
  const userEmail = user?.email ?? "";

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
