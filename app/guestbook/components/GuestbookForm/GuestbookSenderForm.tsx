'use client';

import React, { useState } from 'react';
import CommentSender from '../CommentSender';
import { useToast } from '@/components/ui/use-toast';
import buildUrl from '@/utils/buildUrl';
import { useRouter } from 'next/navigation';
import { GUESTBOOK } from '@/constants/comment';

const GuestbookSenderForm = () => {
  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSend = async (content: string) => {
    setLoading(true);
    try {
      const res = await fetch(buildUrl(`/api/comment`), {
        method: 'POST',
        body: JSON.stringify({
          content,
          blogId: GUESTBOOK,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (data) {
        router.refresh();
        toast({ title: '🎉🎉🎉 发送成功', duration: 2000 });
      }
      return Boolean(data);
    } catch (err: any) {
      console.dir(err);
      toast({
        title: '☹️☹️☹️ 发送失败',
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
