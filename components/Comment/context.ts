import { Comment } from '@/entities/comment';
import { createContext } from 'react';

export type CommentContextType = {
  reply: Comment | undefined;
  setReply: (reply: Comment | undefined) => void;
};

export const initialCommentValue: CommentContextType = {
  reply: undefined,
  setReply: () => {},
};

const CommentContext = createContext<CommentContextType>(initialCommentValue);

export default CommentContext;
