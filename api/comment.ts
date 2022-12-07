import request from 'graphql-request';
import { cache } from 'react';
import {
  CreateCommentInput,
  CreateCommentResponse,
  LikeCommentResponse,
  PostCommentBody,
  QueryCommentsResponse,
  QueryCommentsSearch,
  Comment,
  ValidateCommentAllowOperateRespsone,
  ValidateCommentAllowOperateInput,
} from '@/entities/comment';
import { convertToCommentTreeData } from '@/components/comment/CommentView/utils';
import {
  CREATE_COMMENT,
  LIKE_COMMENT,
  QUERY_COMMENTS,
  VALIDATE_COMMENT_ALLOW_OPERATE,
} from '@/graphqls/comment';
import { endpoint } from './service';
import { ID } from '@/types/response';

export const getComments = cache(async (search: QueryCommentsSearch['search']) => {
  const { comments } = await request<QueryCommentsResponse, QueryCommentsSearch>(
    endpoint,
    QUERY_COMMENTS,
    {
      search,
    }
  );
  const parsedComments = comments.data.map(comment => ({
    ...comment,
    emojiMap: (comment.emoji ? JSON.parse(comment.emoji) : {}) as Comment['emojiMap'],
  }));
  if (search.blogId) {
    console.log('fetch getComments ', parsedComments, ' blogId', search.blogId);
  }
  return {
    ...comments,
    originData: parsedComments as Comment[],
    data: convertToCommentTreeData(parsedComments),
  };
});

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

export const validateCommentAllowOperate = (id: number, uid: string) =>
  request<ValidateCommentAllowOperateRespsone, ValidateCommentAllowOperateInput>(
    endpoint,
    VALIDATE_COMMENT_ALLOW_OPERATE,
    {
      id,
      uid,
    }
  );
