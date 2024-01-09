import React from "react";
import CommentCard from "../CommentCard";
import { getComments } from "@/app/services/comment";
import { GUESTBOOK } from "@/constants/comment";

const GuestbookList = async () => {
  const data = await getComments(GUESTBOOK);
  console.log("data", data);
  return (
    <ul>
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
