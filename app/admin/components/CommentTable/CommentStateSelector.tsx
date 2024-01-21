import React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { commentStateOptions } from '@/constants/comment';

interface CommentStateSelectorProps {}

const CommentStateSelector = ({}: CommentStateSelectorProps) => {
  return (
    <Select>
      <SelectTrigger className="w-48 bg-white">
        <SelectValue placeholder="文章状态" />
      </SelectTrigger>
      <SelectContent>
        {commentStateOptions.map((state) => (
          <SelectItem value={state.value} key={state.value}>
            {state.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CommentStateSelector;
