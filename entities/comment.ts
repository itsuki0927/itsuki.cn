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

export type CommentTypes = {
  comment: Comment;
  searchBody: SearchCommentsBody;
};

export type CommentSchema<T extends CommentTypes = CommentTypes> = {
  endpoint: {
    options: Record<string, any>;
    handlers: {
      likeComment: LikeCommentHook<T>;
    };
  };
};

export type LikeCommentHook<T extends CommentTypes = CommentTypes> = {
  data: void;
  actionInput: { commentId: T['comment']['id'] };
  body: { commentId: T['comment']['id'] };
  fetcherInput: { commentId: T['comment']['id'] };
};
