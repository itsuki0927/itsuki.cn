import { Database as DatabaseGenerated } from '@/types_db';
import { MergeDeep } from 'type-fest';
import { CommentEmoji } from './comment';
import { userAgent } from 'next/server';

export interface IPLocation {
  country: string;
  countryCode: string;
  region: string;
  regionCode: string;
  city: string;
  zip: string;
  flag: string;
  ip: string;
}

export type UserAgent = ReturnType<typeof userAgent>;

export type Database = MergeDeep<
  DatabaseGenerated,
  {
    public: {
      Tables: {
        comment_dev: {
          Row: {
            emoji: CommentEmoji;
            userAgent: UserAgent;
            geo: IPLocation | null;
          };
          Insert: {
            emoji?: CommentEmoji;
            userAgent: UserAgent;
            geo: IPLocation | null;
          };
          Update: {
            emoji?: CommentEmoji;
          };
        };
        comment: {
          Row: {
            emoji: CommentEmoji;
            userAgent: UserAgent;
            geo: IPLocation | null;
          };
          Insert: {
            emoji?: CommentEmoji;
            userAgent: UserAgent;
            geo: IPLocation | null;
          };
          Update: {
            emoji?: CommentEmoji;
          };
        };
      };
    };
  }
>;
