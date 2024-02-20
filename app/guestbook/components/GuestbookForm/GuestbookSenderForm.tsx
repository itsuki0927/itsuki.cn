'use client';

import React, { useState } from 'react';
import CommentSender from '../CommentSender';
import { createComment } from '@/actions/comment';
import { useToast } from '@/components/ui/use-toast';

const GuestbookSenderForm = () => {
  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSend = async (content: string) => {
    setLoading(true);
    try {
      const result = await createComment({
        content,
        agent: navigator.userAgent,
        blogId: 10000,
      });
      return Boolean(result);
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
