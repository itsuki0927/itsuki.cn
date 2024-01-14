import React, { useState } from "react";
import { ChevronDown } from "react-feather";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { CommentState, commentStateMap } from "@/constants/comment";
import { Table } from "@tanstack/react-table";
import { Comment } from "@/types/comment";

import { deleteComments, updateCommentsState } from "@/actions/comment";

interface CommentBatchOperatorProps {
  table: Table<Comment>;
}

const operatorList = [
  { label: "标为垃圾", value: CommentState.Spam },
  { label: "移回收站", value: CommentState.Deleted },
  { label: "退回草稿", value: CommentState.Auditing },
  { label: "通过审核", value: CommentState.Published },
  { label: "永久删除", value: 4 },
];

const CommentBatchOperator = ({ table }: CommentBatchOperatorProps) => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<CommentState | -1 | 4>(-1);
  const disabled = table.getSelectedRowModel().rows.length === 0;

  const getAlertTitle = () => {
    if (state === -1) {
      return;
    }
    if (state === 4) {
      return `确定要永久删除嘛？`;
    }
    return `确定要将 6 个评论更新为「 ${commentStateMap[state].label} 」状态吗？`;
  };

  const confirmBatchOperator = () => {
    const selectedIds = table
      .getSelectedRowModel()
      .rows.map((row) => row.original.id);
    console.log("selected:", selectedIds);
    if (state === -1) {
      return;
    }
    if (state === 4) {
      deleteComments(selectedIds);
      return;
    }
    updateCommentsState(selectedIds, state);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto" disabled={disabled}>
            批量操作 <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {operatorList.map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.value}
                className="capitalize"
                checked={false}
                onCheckedChange={() => {
                  setOpen(true);
                  setState(column.value);
                  console.log(column.value);
                }}
              >
                {column.label}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{getAlertTitle()}</AlertDialogTitle>
            <AlertDialogDescription>操作不可撤销</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={confirmBatchOperator}>
              确认
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CommentBatchOperator;
