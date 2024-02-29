import { Database } from './database';

export type BlogTableType = Database['public']['Tables']['blog'];

export type Blog = BlogTableType['Row'];

export type UpdateBlog = BlogTableType['Update'];

export type BlogState = Database['public']['Enums']['blogState'];

export type BlogMood = Database['public']['Enums']['blogMood'];

export interface BlogSearchParams {
  favorite?: boolean;
  categorySlug?: string;
  tagSlug?: string;
}
