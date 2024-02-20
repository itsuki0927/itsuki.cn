import { Database } from '@/types/database';

export type BlogTableType = Database['public']['Tables']['blog'];

export type BlogTagTableType = Database['public']['Tables']['blogTag'];

export type BlogTag = BlogTagTableType['Row'];
