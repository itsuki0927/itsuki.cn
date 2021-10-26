import { IdentifiableEntity } from './response/base';

export type Comment = IdentifiableEntity<{
  nickname: string;
  email: string;
  website: string;
  content: string;
  liking: number;
  ip: string;
  city: string;
  province: string;
  agent: string;
  status: number;
  fix: string;
  expand: string;
  parentId: number;
  parentNickName: string;
  articleId: number;
  articleTitle: string;
  articleDescription: string;
}>;

export type SearchCommentsBody = {
  articleId: number;
};

export type LikeCommentBody = {
  commentId: number;
};

export type CommentTypes = {
  comment: Comment;
  searchBody: SearchCommentsBody;
  likeBody: LikeCommentBody;
};

export type CommentSchema<T extends CommentTypes = CommentTypes> = {
  endpoint: {
    options: Record<string, any>;
    handlers: CommentHandlers<T>;
  };
};

export type GetCommentHook<T extends CommentTypes = CommentTypes> = {
  data: T['comment'][] | null;
  input: T['searchBody'];
  fetcherInput: T['searchBody'];
  swrState: { isEmpty: boolean };
};

export type LikeCommentHook<T extends CommentTypes = CommentTypes> = {
  data: void;
  actionInput: T['likeBody'];
  body: T['likeBody'];
  fetcherInput: T['likeBody'];
};

export type CommentHandlers<T extends CommentTypes = CommentTypes> = {
  getComment: GetCommentHandler<T>;
  likeComment: LikeCommentHook<T>;
};

export type GetCommentHandler<T extends CommentTypes = CommentTypes> =
  GetCommentHook<T> & {
    body: T['searchBody'];
  };
