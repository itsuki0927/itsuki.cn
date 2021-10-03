import request from '@/utils/request';

/** 发布评论 */
export const postComment = (data: any) => request.post('/comment', data).then(res => res.data);
