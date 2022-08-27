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
  publish: number;
  banner: number;
  reading: number;
  liking: number;
  commenting: number;
  tags: Tag[];
  comments: Comment[];
}>;

export type SearchArticlesBody = {
  search?: string;
  name?: string;
  tagPath?: string;
  recent?: boolean;
  hot?: boolean;
  banner?: number;
  pageSize?: number;
  current?: number;
  publish?: PublishState;
};

export type ArticleDetailResponse = Article & {
  prevArticle: Article | null;
  nextArticle: Article | null;
  htmlContent: string;
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
  | 'id'
  | 'reading'
  | 'title'
  | 'createAt'
  | 'description'
  | 'commenting'
  | 'liking'
  | 'path'
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
