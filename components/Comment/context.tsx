import { Comment } from '@/entities/comment';
import { createCtx } from '@/utils/index';

export type ReplyActionTypes = { type: 'reset' } | { type: 'reply'; payload: Comment };

const replyReducer = (state: Comment | null, action: ReplyActionTypes) => {
  switch (action.type) {
    case 'reset':
      return null;
    case 'reply':
      return action.payload;
    default:
      return state;
  }
};

const [ReplyProvider, useReplyDispatch, useReply] = createCtx(replyReducer, null);

export { ReplyProvider, useReply, useReplyDispatch };
