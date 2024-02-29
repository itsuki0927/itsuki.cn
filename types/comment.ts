import { Database } from './database';

export type CommentTableType = Database['public']['Tables']['comment_dev'];

export type Comment = CommentTableType['Row'];

export type InsertComment = CommentTableType['Insert'];

export type InsertCommentBody = Pick<
  InsertComment,
  'content' | 'blogId' | 'section'
>;

export type UpdateComment = CommentTableType['Update'];

export type CommentEmoji = Record<string, string[]>;

export type CommentState = Database['public']['Enums']['commentState'];
