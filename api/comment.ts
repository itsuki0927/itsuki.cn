import request from '@/utils/request';

/** 发布评论 */
export const postComment = (data: any) => request.post('/comment', data).then(res => res.data);

/** 获取指定文章下的评论 */
export const getCommentListByArticleId = (articleId: number) =>
  request.get(`/comment/${articleId}`).then(res => res.data);
