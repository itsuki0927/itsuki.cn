import {
  IdentifiableEntity,
  MutationRequest,
  SearchRequest,
  SearchResponse,
} from '../types/response';

export type Comment = IdentifiableEntity<{
  nickname: string;
  email: string;
  avatar: string;
  content: string;
  liking: number;
  emoji: string;
  emojiMap?: Record<string, number>;
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
  provider: string;
}>;

export type SearchCommentsBody = {
  articleId?: number;
  recent?: boolean;
};

export type LikeCommentBody = {
  commentId: number;
};

export type PostCommentBody = {
  nickname: string;
  email: string;
  content: string;
  articleId: number;
  agent: string;
  avatar: string;
  provider: string;
  parentId?: number;
};

export type QueryCommentsResponse = {
  comments: SearchResponse<Comment>;
};

export type CreateCommentResponse = {
  createComment: Comment;
};

export type QueryCommentsSearch = SearchRequest<SearchCommentsBody>;

export type CreateCommentInput = MutationRequest<PostCommentBody>;

export type LikeCommentResponse = {
  likeComment: string;
};
