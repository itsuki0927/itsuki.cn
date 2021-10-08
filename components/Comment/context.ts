import { createContext } from 'react';
import { Comment } from '@/entities/comment';

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
