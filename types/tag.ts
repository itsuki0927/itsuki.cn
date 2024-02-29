import { Database } from './database';

export type TagTableType = Database['public']['Tables']['tag'];

export type Tag = TagTableType['Row'];
