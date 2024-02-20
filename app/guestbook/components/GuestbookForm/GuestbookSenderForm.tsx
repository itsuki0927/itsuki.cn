"use client";

import React, { useState } from "react";
import CommentSender from "../CommentSender";
import { createComment } from "@/app/services/comment";

const GuestbookSenderForm = () => {
  const [isLoading, setLoading] = useState(false);

  const handleSend = async (content: string) => {
    setLoading(true);
    const result = await createComment({
      content,
      agent: navigator.userAgent,
      blogId: 10000,
    });
    setLoading(false);
    return Boolean(result);
  };

  return <CommentSender onSend={handleSend} isLoading={isLoading} />;
};

export default GuestbookSenderForm;
