import { BadgeVariants } from "@/components/ui/badge";

export const GUESTBOOK = 10000;

export const ADMIN_EMAIL1 = process.env.ADMIN_EMAIL1;

export const ADMIN_EMAIL2 = process.env.ADMIN_EMAIL2;

export enum CommentState {
  Auditing = 0, // 待审核
  Published = 1, // 通过正常
  Spam = 2, // 垃圾评论
  Deleted = 3, // 已删除
  // 0 -> 默认状态: 以回收站、审核通过
  // 1 -> 审核通过: 以回收站、标为垃圾
  // 2 -> 标为垃圾: 移回收站
  // 3 -> 移回收站: 退回草稿、彻底删除
}

export const commentStateMap: Record<
  CommentState,
  {
    label: string;
    badge: Exclude<BadgeVariants["variant"], null | undefined>;
    value: CommentState;
  }
> = {
  [CommentState.Auditing]: {
    label: "待审核",
    badge: "secondary",
    value: CommentState.Auditing,
  },
  [CommentState.Published]: {
    label: "已发布",
    badge: "default",
    value: CommentState.Published,
  },
  [CommentState.Spam]: {
    label: "垃圾评论",
    badge: "destructive",
    value: CommentState.Spam,
  },
  [CommentState.Deleted]: {
    label: "回收站",
    badge: "outline",
    value: CommentState.Deleted,
  },
};
export const commentStateOptions = Object.values(commentStateMap);
