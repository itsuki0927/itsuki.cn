import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { CommentState, commentStateMap } from '@/constants/comment';
import { Table } from '@tanstack/react-table';
import { Comment } from '@/types/comment';

import { deleteComments, updateCommentsState } from '@/actions/comment';

interface CommentBatchOperatorProps {
  table: Table<Comment>;
}

const operatorList = [
  { label: '标为垃圾', value: CommentState.Spam },
  { label: '移回收站', value: CommentState.Trash },
  { label: '退回草稿', value: CommentState.Auditing },
  { label: '通过审核', value: CommentState.Published },
  { label: '永久删除', value: CommentState.Deleted },
];

const CommentBatchOperator = ({ table }: CommentBatchOperatorProps) => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<CommentState | null>(null);
  const selectedRows = table.getSelectedRowModel().rows;
  const selectedRowsCount = selectedRows.length;
  const disabled = selectedRowsCount === 0;

  const getAlertTitle = () => {
    if (state === null) {
      return;
    }
    if (state === CommentState.Deleted) {
      return `确定要永久删除嘛？`;
    }
    return `确定要将 ${selectedRowsCount} 个评论更新为「 ${commentStateMap[state].label} 」状态吗？`;
  };

  const confirmBatchOperator = () => {
    const selectedIds = selectedRows.map((row) => row.original.id);
    if (state === null) {
      return;
    }
    if (state === CommentState.Deleted) {
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
