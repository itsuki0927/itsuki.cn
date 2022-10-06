// 用户点赞storage key
export const LikeCommentsKey = 'LikeCommentsKey';

export const LikeBlogsKey = 'LikeBlogsKey';

// 点赞初始值
export const initialLikeValue = {};

// 类型推断
export type LikeBlogs = Record<number, number>;

export type LikeComments = Record<number, boolean>;
