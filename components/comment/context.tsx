import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { Comment } from '@/entities/comment';

interface ReplyContextType {
  reply?: Comment;
  setReply: (comment: Comment) => void;
  cancelReply: () => void;
}

const ReplyContext = createContext<ReplyContextType>({
  reply: undefined,
  setReply: () => {},
  cancelReply: () => {},
});

export const useReply = () => {
  const context = useContext(ReplyContext);
  if (context === undefined) {
    throw new Error('reply context error');
  }
  return context;
};

export const ReplyProvider = ({ children }: { children: ReactNode }) => {
  const [reply, setReply] = useState<Comment | undefined>();

  const value = useMemo(
    () => ({
      reply,
      setReply,
      cancelReply: () => setReply(undefined),
    }),
    [reply, setReply]
  );

  return <ReplyContext.Provider value={value}>{children}</ReplyContext.Provider>;
};
