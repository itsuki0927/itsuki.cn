import { IdentifiableEntity, SearchRequest, SearchResponse } from '../types/response';

export type Comment = IdentifiableEntity<{
  nickname: string;
  email: string;
  website: string;
  content: string;
  liking: number;
  ip: string;
  city: string;
  province: string;
  agent: string;
  status: number;
  fix: string;
  expand: string;
  parentId: number;
  parentNickName: string;
  articleId: number;
  articleTitle: string;
  articleDescription: string;
}>;

export type SearchCommentsBody = {
  articleId: number;
};

export type LikeCommentBody = {
  commentId: number;
};

export type PostCommentBody = {
  nickname: string;
  email: string;
  website: string;
  content: string;
  articleId: number;
  agent: string;
  parentId?: number;
};

export type QueryCommentsResponse = {
  comments: SearchResponse<Comment>;
};

export type QueryCommentsSearch = SearchRequest<SearchCommentsBody>;
