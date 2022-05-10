import request from 'graphql-request';
import {
  CreateCommentInput,
  CreateCommentResponse,
  PostCommentBody,
  QueryCommentsResponse,
  QueryCommentsSearch,
} from '@/entities/comment';
import { CREATE_COMMENT, QUERY_COMMENTS } from '@/graphqls/comment';
import service, { endpoint } from './service';

export const getComments = async (articleId: number) => {
  const { comments } = await request<QueryCommentsResponse, QueryCommentsSearch>(
    endpoint,
    QUERY_COMMENTS,
    {
      search: {
        articleId,
      },
    }
  );
  return comments;
};

export const createComment = async (input: PostCommentBody) => {
  const { createComment: comment } = await request<
    CreateCommentResponse,
    CreateCommentInput
  >(endpoint, CREATE_COMMENT, {
    input,
  });
  return comment;
};

// export const createComment = (newComment: PostCommentBody) =>
//   service.request<void, Comment>({
//     method: 'post',
//     url: '/comment',
//     data: newComment,
//   });

export const likeComment = (id: number) =>
  service.request<void, number>({
    method: 'patch',
    url: `/comment/${id}/like`,
  });
