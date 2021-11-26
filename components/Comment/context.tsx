import { createContext, FC, useContext, useState } from 'react';
import { Comment } from '@/entities/comment';

export type ReplyContextType = {
  value: Comment | undefined;
  dispatch: (reply: Comment | undefined) => void;
};

export const initialReplyValue = undefined;
export const initialReplyDispatchValue = () => {};

const ReplyContext = createContext<ReplyContextType['value']>(initialReplyValue);

const ReplyDispatchContext = createContext<ReplyContextType['dispatch']>(
  initialReplyDispatchValue
);

export const useReply = () => useContext(ReplyContext);

export const useReplyDispatch = () => useContext(ReplyDispatchContext);

export const ReplyProvider: FC = function ({ children }) {
  const [state, dispatch] = useState<Comment | undefined>();
  return (
    <ReplyContext.Provider value={state}>
      <ReplyDispatchContext.Provider value={dispatch}>
        {children}
      </ReplyDispatchContext.Provider>
    </ReplyContext.Provider>
  );
};

export default ReplyContext;
