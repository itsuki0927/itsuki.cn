import { Comment } from './comment';
import { IdentifiableEntity, SearchRequest, SearchResponse } from '../types/response';
import { Tag } from './tag';
import { PublishState } from '@/constants/blog/publish';

export enum BlogCardStyle {
  Image,
  Text,
  Mixin,
}

export type Blog = IdentifiableEntity<{
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
  cardStyle?: BlogCardStyle;
}>;

export type SearchBlogsBody = {
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

export type BlogDetailResponse = Blog & {
  prevBlog: Blog | null;
  nextBlog: Blog | null;
  htmlContent: string;
  originLiking: number;
};

export type BlogTypes = {
  blog: Blog;
  searchBody: SearchBlogsBody;
  likeBody: LikeBlogBody;
};

export type BlogArchive = Pick<
  Blog,
  | 'id'
  | 'reading'
  | 'title'
  | 'createAt'
  | 'description'
  | 'commenting'
  | 'liking'
  | 'path'
  | 'cover'
  | 'cardStyle'
>;

export type BlogArchiveResponse = Map<string, BlogArchive[]>;

export type GetAllBlogPathsQuery = SearchResponse<Blog>;

export type QueryBlogSearch = SearchRequest<SearchBlogsBody>;

export type QueryBlogResponse = {
  blog: BlogDetailResponse;
};

export type QueryBlogsResponse = {
  blogs: SearchResponse<Blog>;
};

export type LikeBlogBody = {
  id: number;
  count: number;
};

export type LikeBlogResponse = {
  likeBlog: number;
};

export type ReadBlogResponse = {
  readBlog: number;
};
