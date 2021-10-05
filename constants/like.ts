// 用户点赞storage key
export const USER_LIKE_COMMENT = 'USER_LIKE_COMMENT';

export const USER_LIKE_ARTICLE = 'USER_LIKE_ARTICLE';

// 点赞初始值
export const initialUserLikeHistory = {};

// 类型推断
export type UserLikeComments = Record<number, boolean>;

export type UserLikeArticles = Record<number, boolean>;
