"use client";

import CommentAvatar from "@/app/guestbook/components/CommentAvatar";
import { Comment } from "@/app/types/comment";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { deleteComment, updateCommentState } from "@/app/lib/supabase";

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

export const columns: ColumnDef<Comment>[] = [
  {
    accessorKey: "state",
    header: "State",
  },
  {
    accessorKey: "parentId",
    header: "Parent ID",
  },
  {
    accessorKey: "blogId",
    header: "Blog ID",
  },
  {
    header: "个人信息",
    accessorKey: "avatar",
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          <CommentAvatar avatar={row.original.avatar} />
          <span>{row.original.nickname}</span>
          <span>{row.original.email}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "content",
    header: "Content",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <span>{new Date(row.original.createdAt).toLocaleString()}</span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      // Auditing = 0, // 待审核
      // Published = 1, // 通过正常
      // Deleted = -1, // 已删除
      // Spam = -2, // 垃圾评论
      const state = row.original.state;
      console.log("row", row.original);
      return (
        <div>
          <Button variant="link">评论详情</Button>
          <Button
            variant="destructive"
            onClick={() => {
              updateCommentState(row.original.id, CommentState.Spam);
            }}
          >
            标为垃圾
          </Button>

          <Button variant="outline" onClick={() => {}}>
            审核通过
          </Button>

          <Button variant="secondary">退回草稿</Button>

          <Button variant="ghost">移回收站</Button>

          <Button
            variant="ghost"
            onClick={async () => {
              const result = await deleteComment(row.original.id);
              console.log("result:", result);
            }}
          >
            永久删除
          </Button>

          <Button variant="link">宿主页面</Button>
        </div>
      );
    },
  },
];
