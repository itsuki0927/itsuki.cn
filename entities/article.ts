import { ArticleOrigin } from '@/constants/article/origin';
import { ArticleOpen } from '@/constants/article/public';
import { Category } from './category';
import { Comment } from './comment';
import { IdentifiableEntity, SearchRequest, SearchResponse } from '../types/response';
import { Tag } from './tag';
import { PublishState } from '@/constants/article/publish';

export type Article = IdentifiableEntity<{
  title: string;
  path: string;
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
  category: Category;
  comments: Comment[];
}>;

export type SearchArticlesBody = {
  search?: string;
  name?: string;
  tagPath?: string;
  categoryPath?: string;
  hot?: number;
  banner?: number;
  pageSize?: number;
  current?: number;
  publish?: PublishState;
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
  'id' | 'reading' | 'title' | 'createAt' | 'description' | 'commenting' | 'liking'
>;

export type ArticleArchiveResponse = Map<string, ArticleArchive[]>;

export type GetAllArticlePathsQuery = SearchResponse<Article>;

export type QueryArticleSearch = SearchRequest<SearchArticlesBody>;

export type QueryArticleResponse = {
  article: ArticleDetailResponse;
};

export type QueryArticlesResponse = {
  articles: SearchResponse<Article>;
};

export type LikeArticleResponse = {
  likeArticle: number;
};

export type ReadArticleResponse = {
  readArticle: number;
};
