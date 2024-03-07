'use client';

import React, { useState } from 'react';
import CommentSender from '../CommentSender';
import buildUrl from '@/utils/buildUrl';
import { useRouter } from 'next/navigation';
import { GUESTBOOK } from '@/constants/comment';
import { toast } from 'sonner';

const GuestbookSenderForm = () => {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const handleSend = async (content: string) => {
    setLoading(true);
    try {
      const loadingToastId = toast.loading('发送中...');
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
      toast.dismiss(loadingToastId);
      if (data) {
        router.refresh();
        toast('🎉🎉🎉 发送成功');
      }
      return Boolean(data);
    } catch (err: any) {
      console.dir(err);
      toast.error('☹️☹️☹️ 发送失败:' + err.message);
    } finally {
      setLoading(false);
    }
    return false;
  };

  return (
    <CommentSender
      className="p-2 relative bg-white z-10 rounded-xl border border-solid border-zinc-100"
      onSend={handleSend}
      isLoading={isLoading}
    />
  );
};

export default GuestbookSenderForm;
