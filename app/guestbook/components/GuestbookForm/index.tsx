import { auth } from "@/app/auth";
import React from "react";
import GithubAuthIcon from "../GithubAuthIcon";
import GoogleAuthIcon from "../GoogleAuthIcon";
import GuestbookSenderForm from "./GuestbookSenderForm";

const GuestbookForm = async () => {
  const session = await auth();

  if (session) {
    return <GuestbookSenderForm />;
  }

  return (
    <div className="flex">
      <GithubAuthIcon />
      <GoogleAuthIcon />
    </div>
  );
};

export default GuestbookForm;
