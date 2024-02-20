'use client';

import React, { useState } from 'react';
import CommentSender from '../CommentSender';
// import { createComment } from '@/actions/comment';
import { useToast } from '@/components/ui/use-toast';
import buildUrl from '@/utils/buildUrl';

const GuestbookSenderForm = () => {
  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSend = async (content: string) => {
    setLoading(true);
    try {
      const res = await fetch(buildUrl(`/api/comment`), {
        method: 'POST',
        body: JSON.stringify({
          content,
          blogId: 10000,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      return Boolean(data);
    } catch (err: any) {
      console.dir(err);
      toast({
        title: '发送失败',
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
    return false;
  };

  return <CommentSender onSend={handleSend} isLoading={isLoading} />;
};

export default GuestbookSenderForm;
