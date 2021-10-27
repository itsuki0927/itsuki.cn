import { CommentSchema } from '@/entities/comment';
import { createEndpoint, GetAPISchema } from '@/framework/blog/api';
import commentEndpoint from '@/framework/blog/api/endpoints/comment';
import { ItsukiBlogAPI } from '../..';
import likeComment from './like-comment';
import getComment from './get-comment';
import postComment from './post-comment';

export type CommentAPI = GetAPISchema<ItsukiBlogAPI, CommentSchema>;

export type CommentEndpoint = CommentAPI['endpoint'];

export const handlers: CommentEndpoint['handlers'] = {
  likeComment,
  getComment,
  postComment,
};

export const CommentPathPrefix = '/comment';

const commentApi = createEndpoint<CommentAPI>({
  handler: commentEndpoint,
  handlers,
});

export default commentApi;
