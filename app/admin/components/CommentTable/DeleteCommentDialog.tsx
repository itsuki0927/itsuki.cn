import { deleteComment } from "@/app/lib/supabase";
import { Comment } from "@/app/types/comment";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Row } from "@tanstack/react-table";

import React from "react";

interface DeleteCommentDialogProps {
  row: Row<Comment>;
}

const DeleteCommentDialog = ({ row }: DeleteCommentDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="ghost">永久删除</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>确认?</AlertDialogTitle>
          <AlertDialogDescription>
            这个操作将永久删除该评论, 你确定要删除嘛?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              const result = await deleteComment(row.original.id);
              console.log("result:", result);
            }}
          >
            确认
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCommentDialog;
