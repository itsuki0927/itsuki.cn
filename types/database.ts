import { Database as DatabaseGenerated } from '@/types_db';
import { MergeDeep } from 'type-fest';
import { CommentEmoji } from './comment';
import { userAgent } from 'next/server';
import { BlogTag } from './blogTag';
import { Tag } from './tag';
import { Category } from './category';
import { CommentState } from '@/constants/comment';

export type UserAgent = ReturnType<typeof userAgent>;

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

export interface BlogReactions {
  reactions: [number, number, number, number];
}

export type Database = MergeDeep<
  DatabaseGenerated,
  {
    public: {
      Tables: {
        blog: {
          Row: {
            blogTag: BlogTag[];
            tag: Tag[];
            category: Category;
            reactions: BlogReactions;
          };
        };
        comment_dev: {
          Row: {
            emoji: CommentEmoji;
            userAgent: UserAgent;
            geo: IPLocation | null;
            state: CommentState;
            provider: string;
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
            state: CommentState;
            provider: string;
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
