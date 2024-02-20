import { Database as DatabaseGenerated } from '@/types_db';
import { MergeDeep } from 'type-fest';
import { CommentEmoji } from './comment';
import { userAgent } from 'next/server';
import { Geo } from '@/actions/ip';

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
            geo: Geo | null;
          };
          Insert: {
            emoji?: CommentEmoji;
            userAgent: UserAgent;
            geo: Geo | null;
          };
          Update: {
            emoji?: CommentEmoji;
          };
        };
      };
    };
  }
>;
