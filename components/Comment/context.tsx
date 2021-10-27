import { createContext, FC, useContext, useState } from 'react';
import { Comment } from '@/entities/comment';

export type ReplyContextType = {
  reply: Comment | undefined;
  setReply: (reply: Comment | undefined) => void;
};

export const initialReplyValue: ReplyContextType = {
  reply: undefined,
  setReply: () => {},
};

const ReplyContext = createContext<ReplyContextType>(initialReplyValue);

export const ReplyProvider: FC = ({ children }) => {
  const [reply, setReply] = useState<Comment | undefined>();
  return (
    <ReplyContext.Provider value={{ reply, setReply }}>{children}</ReplyContext.Provider>
  );
};

export const useReply = () => useContext(ReplyContext);

export default ReplyContext;
