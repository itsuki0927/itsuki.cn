"use server";

import { getSession, isAdminSession } from "@/actions/session";
import { revalidateTag, unstable_noStore as noStore } from "next/cache";
import { TAGS } from "@/constants/tag";
import { InsertComment } from "@/types/comment";
import { CommentState } from "@/constants/comment";
import { createBrowserClient } from "@/libs/supabase";
import { checkIPIsBlocked, getIP } from "./ip";

export const getComments = async (blogId: Number) => {
  noStore();
  const supabase = createBrowserClient();
  try {
    const { data: comments } = await supabase
      .from("comment")
      .select("*")
      .eq("blogId", blogId)
      .order("createdAt", { ascending: false });
    return comments;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

interface SearchCommentParams {
  state?: CommentState;
  blogId?: number;
}

export const getAllComments = async (params: SearchCommentParams = {}) => {
  const isAdmin = await isAdminSession();
  if (!isAdmin) {
    return;
  }
  // noStore();
  const supabase = createBrowserClient();
  try {
    const builder = supabase
      .from("comment")
      .select("*")
      .order("createdAt", { ascending: false });
    if (params.state) {
      builder.eq("state", params.state);
    }
    if (params.blogId) {
      builder.eq("blogId", params.blogId);
    }

    const { data: comments } = await builder;

    return comments;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const createComment = async (
  row: Pick<InsertComment, "agent" | "blogId" | "content">,
) => {
  const user = await getSession();
  if (!user) {
    return;
  }
  const ip = getIP();
  const isBlocked = await checkIPIsBlocked();
  if (isBlocked) {
    throw new Error("You have been blocked.");
  }
  console.log("ip:", ip);
  const input = { ...row, ...user, ip };
  const supabase = createBrowserClient();
  try {
    const { data } = await supabase.from("comment").insert([input]).select();
    revalidateTag(TAGS.comment);
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const updateCommentsState = async (
  ids: number[],
  state: CommentState,
) => {
  const isAdmin = await isAdminSession();
  if (!isAdmin) {
    return;
  }
  if (ids.some((id) => isNaN(id))) {
    throw new Error("参数错误");
  }

  const supabase = createBrowserClient();
  try {
    const { data } = await supabase
      .from("comment")
      .update({ state })
      .in("id", ids);

    revalidateTag(TAGS.adminComment);
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const updateCommentState = (id: number, state: CommentState) =>
  updateCommentsState([id], state);

export const deleteComments = async (ids: number[]) => {
  const isAdmin = await isAdminSession();
  if (!isAdmin) {
    return;
  }
  if (ids.some((id) => isNaN(id))) {
    throw new Error("参数错误");
  }

  const supabase = createBrowserClient();
  try {
    const { data } = await supabase.from("comment").delete().in("id", ids);

    revalidateTag(TAGS.adminComment);
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const deleteComment = (id: number) => deleteComments([id]);

export const likeComment = async (id: number, emoji: string) => {
  const isBlocked = await checkIPIsBlocked();
  if (isBlocked) {
    throw new Error("You have been blocked.");
  }
  const session = await getSession();
  if (!session) {
    return;
  }
  if (isNaN(id)) {
    throw new Error("参数错误");
  }

  const supabase = createBrowserClient();
  const { data } = await supabase.from("comment").select("*").eq("id", id);
  const comment = data?.at(0);
  if (!data || !comment) {
    throw new Error("评论不存在");
  }

  if (comment.state !== 0) {
    throw new Error("评论还没发布呢");
  }

  const currentEmojiMap = comment.emoji || {};
  const email = session.email;

  // 如果有 emoji
  if (currentEmojiMap) {
    if (currentEmojiMap[emoji]) {
      if (currentEmojiMap[emoji].includes(email)) {
        currentEmojiMap[emoji] = currentEmojiMap[emoji].filter(
          (v) => v !== email,
        );
      } else {
        currentEmojiMap[emoji].push(email);
      }
    } else {
      currentEmojiMap[emoji] = [email];
    }
  }

  const result = await supabase
    .from("comment")
    .update({ emoji: currentEmojiMap })
    .eq("id", id);

  return result;
};
