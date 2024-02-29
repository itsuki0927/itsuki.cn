import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

interface CommentSearchInputProps {}

const CommentSearchInput = ({}: CommentSearchInputProps) => {
  const [input, setInput] = useState('');

  return (
    <Input
      placeholder="输入评论内容搜索"
      value={input}
      onChange={(event) => setInput(event.target.value)}
      className="max-w-sm bg-white"
    />
  );
};

export default CommentSearchInput;
