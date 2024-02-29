import { Database } from '@/types/database';

type CategoryTableType = Database['public']['Tables']['category'];

export type Category = CategoryTableType['Row'];

export type InsertCategory = CategoryTableType['Insert'];

export type UpdateCategory = CategoryTableType['Update'];

export interface CategoryTree extends Category {
  children?: Array<CategoryTree>;
}
