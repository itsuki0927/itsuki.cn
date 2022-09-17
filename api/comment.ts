import request from 'graphql-request';
import {
  CreateCommentInput,
  CreateCommentResponse,
  LikeCommentResponse,
  PostCommentBody,
  QueryCommentsResponse,
  QueryCommentsSearch,
} from '@/entities/comment';
import { CREATE_COMMENT, LIKE_COMMENT, QUERY_COMMENTS } from '@/graphqls/comment';
import { endpoint } from './service';
import { ID } from '@/types/response';

export const getComments = async (search: QueryCommentsSearch['search']) => {
  const { comments } = await request<QueryCommentsResponse, QueryCommentsSearch>(
    endpoint,
    QUERY_COMMENTS,
    {
      search,
    }
  );
  return comments;
};

export const getRecentComments = () => getComments({ recent: true });

export const createComment = async (input: PostCommentBody) => {
  const { createComment: comment } = await request<
    CreateCommentResponse,
    CreateCommentInput
  >(endpoint, CREATE_COMMENT, {
    input,
  });
  return comment;
};

export const likeComment = (id: number, emoji: string) =>
  request<LikeCommentResponse, ID & { emoji: string }>(endpoint, LIKE_COMMENT, {
    id,
    emoji,
  });
