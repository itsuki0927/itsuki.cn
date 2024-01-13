"use server";

import { User } from "next-auth";
import { auth } from "../auth";
import isAdminEmail from "../utils/isAdminEmail";

export const formatUser = (user: User | null) => {
  if (!user) return null;
  return {
    email: user.email ?? "",
    nickname: user.name || user.email || "",
    avatar: user.image || "",
  };
};

export type FormatedUser = ReturnType<typeof formatUser>;

export const getSession = async () => {
  let session = await auth();
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  return formatUser(session.user);
};

export const isAdminSession = async () => {
  const session = await getSession();
  if (!isAdminEmail(session?.email)) {
    throw new Error("Not auth");
  }
  return true;
};
