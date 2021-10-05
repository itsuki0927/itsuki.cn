/**
 * 评论创建请求类
 */
export type CommentCreateRequest = {
  nickname: string;
  email: string;
  website: string;
  agent: string;
  content: string;
  articleId: number;
  parentId?: number;
};
