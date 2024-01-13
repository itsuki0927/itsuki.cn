"use server";

import { Database } from "@/types_db";
import type { CookieOptions } from "@supabase/ssr";
import {
  createServerClient as _createServerClient,
  createBrowserClient as _createBrowserClient,
} from "@supabase/ssr";
import { cookies } from "next/headers";
import { unstable_noStore as noStore, revalidateTag } from "next/cache";
import { CommentState } from "../admin/components/CommentTable/columns";
import { InsertComment } from "../types/comment";
import { getSession, isAdminSession } from "../db/actions";
import { TAGS } from "@/constants/tag";

export const createServerClient = (
  cookieStoreParams?: ReturnType<typeof cookies>,
) => {
  const cookieStore = cookieStoreParams || cookies();
  return _createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    },
  );
};

export const createBrowserClient = () =>
  _createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

export const getComments = async (blogId: Number) => {
  noStore();
  const supabase = createBrowserClient();
  try {
    const { data: comments } = await supabase
      .from("comment")
      .select("*")
      .eq("blogId", blogId);
    return comments;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const getAllComments = async () => {
  const isAdmin = await isAdminSession();
  if (!isAdmin) {
    return;
  }
  noStore();
  const supabase = createBrowserClient();
  try {
    const { data: comments } = await supabase.from("comment").select("*");
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
  const input = { ...row, ...user };
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

export const updateCommentState = async (id: number, state: CommentState) => {
  const isAdmin = await isAdminSession();
  if (!isAdmin) {
    return;
  }
  if (isNaN(id)) {
    throw new Error("参数错误");
  }

  const supabase = createBrowserClient();
  try {
    const { data } = await supabase
      .from("comment")
      .update({ state })
      .eq("id", id)
      .select();
    revalidateTag(TAGS.adminComment);
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const deleteComment = async (id: number) => {
  const isAdmin = await isAdminSession();
  if (!isAdmin) {
    return;
  }
  if (isNaN(id)) {
    throw new Error("参数错误");
  }

  const supabase = createBrowserClient();
  try {
    const { data } = await supabase
      .from("comment")
      .delete()
      .eq("id", id)
      .select();
    revalidateTag(TAGS.adminComment);
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
