// 用户点赞storage key
export const LikeCommentsKey = 'LikeCommentsKey';

export const LikeArticlesKey = 'LikeArticlesKey';

// 点赞初始值
export const initialLikeValue = {};

// 类型推断
export type LikeArticles = Record<number, boolean>;

export type LikeComments = Record<number, boolean>;
