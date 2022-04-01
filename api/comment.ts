import { Comment, PostCommentBody } from '@/entities/comment';
import service from './service';

export const getComments = (articleId: number) =>
  service.request<void, Comment[]>({
    method: 'get',
    url: `/article/${articleId}/comments`,
  });

export const createComment = (newComment: PostCommentBody) =>
  service.request<void, Comment>({
    method: 'post',
    url: '/comment',
    data: newComment,
  });

export const likeComment = (id: number) =>
  service.request<void, number>({
    method: 'patch',
    url: `/comment/${id}/like`,
  });
