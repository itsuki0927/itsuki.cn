/* eslint-disable import/no-cycle */
import { CommentSchema } from '@/entities/comment';
import { createEndpoint, GetAPISchema } from '@/framework/blog/api';
import commentEndpoint from '@/framework/blog/api/endpoints/comment';
import { ItsukiBlogAPI } from '../..';
import likeComment from './like-comment';
import getComment from './get-comment';

export type CommentAPI = GetAPISchema<ItsukiBlogAPI, CommentSchema>;

export type CommentEndpoint = CommentAPI['endpoint'];

export const handlers: CommentEndpoint['handlers'] = { likeComment, getComment };

export const CommentPathPrefix = '/comment';

const commentApi = createEndpoint<CommentAPI>({
  handler: commentEndpoint,
  handlers,
});

export default commentApi;
