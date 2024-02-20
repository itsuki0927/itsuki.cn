import CommentCard from "../CommentCard";
import { GUESTBOOK } from "@/constants/comment";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/libs/auth";

import {getComments} from "@/actions/comment";

const GuestbookList = async () => {
  const session = await auth();
  const data = await getComments(GUESTBOOK);
  console.log("data", data);
  return (
    <SessionProvider session={session}>
      <ul className="rounded-md overflow-hidden">
        {data?.map((comment) => (
          <CommentCard
            className="bg-white border-b border-solid border-gray-100"
            key={comment.id}
            comment={comment}
          />
        ))}
      </ul>
    </SessionProvider>
  );
};

export default GuestbookList;
