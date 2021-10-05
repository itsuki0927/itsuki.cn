import { CommentCreateRequest } from '@/entities/request/comment';
import request from '@/utils/request';

/** 发布评论 */
export const postComment = (data: CommentCreateRequest) =>
  request.post('/comment', data).then(res => res.data);

/** 获取指定文章下的评论 */
export const getCommentListByArticleId = (articleId: number) =>
  request.get(`/comment/${articleId}`).then(res => res.data);

/** 更新评论meta */
export const patchCommentMeta = (commentId: number, data: { meta: string }) =>
  request.patch(`/comment/${commentId}`, data).then(res => res.data);
