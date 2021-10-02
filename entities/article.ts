import { ArticleOrigin } from '@/constants/article/origin';
import { ArticleOpen } from '@/constants/article/public';
import { PublishState } from '@/constants/publish';
import { Category } from './category';
import { IdentifiableEntity } from './response/base';
import { Tag } from './tag';

export type Article = IdentifiableEntity<{
  title: string;
  description: string;
  content: string;
  author: string;
  cover: string;
  status: number;
  keywords: string;
  open: ArticleOpen;
  publish: PublishState;
  origin: ArticleOrigin;
  reading: number;
  liking: number;
  commenting: number;
  tags: Tag[];
  categories: Category[];
}>;
