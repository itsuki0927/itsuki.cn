import { ArticleOrigin } from '@/constants/article/origin';
import { ArticleOpen } from '@/constants/article/public';
import { Category } from './category';
import { Comment } from './comment';
import { IdentifiableEntity, SearchResponse } from '../types/response';
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
  origin: ArticleOrigin;
  publish: number;
  banner: number;
  reading: number;
  liking: number;
  commenting: number;
  tags: Tag[];
  categories: Category[];
  comments: Comment[];
}>;

export type SearchArticlesBody = {
  search?: string;
  name?: string;
  tag?: string;
  category?: string;
  pinned?: number;
  hot?: number;
  banner?: number;
  pageSize?: number;
  current?: number;
};

export type ArticleDetailResponse = Article & {
  prevArticle: Article | null;
  nextArticle: Article | null;
};

export type LikeArticleBody = {
  articleId: number;
};

export type ArticleTypes = {
  article: Article;
  searchBody: SearchArticlesBody;
  likeBody: LikeArticleBody;
};

export type ArticleArchive = Pick<
  Article,
  'id' | 'title' | 'createAt' | 'description'
> & {
  createAtString: string;
};

export type ArticleArchiveMap = Record<string, ArticleArchive[]>;

export type ArticleArchiveResponse = Record<string, ArticleArchiveMap>;

export type GetAllArticlePathsQuery = SearchResponse<Article>;
