import React from "react";
import CommentCard from "../CommentCard";
import { GUESTBOOK } from "@/constants/comment";
import { getComments } from "@/app/lib/supabase";

const GuestbookList = async () => {
  const data = await getComments(GUESTBOOK);
  console.log("data", data);
  return (
    <ul className="rounded-md overflow-hidden">
      {data?.map((comment) => (
        <CommentCard
          className="bg-white border-b border-solid border-gray-100"
          key={comment.id}
          comment={comment}
        />
      ))}
    </ul>
  );
};

export default GuestbookList;
