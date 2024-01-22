import { Database as DatabaseGenerated } from '@/types_db';
import { MergeDeep } from 'type-fest';
import { CommentEmoji } from './comment';
import { userAgent } from 'next/server';

export type UserAgent = ReturnType<typeof userAgent>;

export type Database = MergeDeep<
  DatabaseGenerated,
  {
    public: {
      Tables: {
        comment: {
          Row: {
            emoji: CommentEmoji;
            userAgent: UserAgent;
          };
          Insert: {
            emoji?: CommentEmoji;
            userAgent: UserAgent;
          };
          Update: {
            emoji?: CommentEmoji;
          };
        };
      };
    };
  }
>;
