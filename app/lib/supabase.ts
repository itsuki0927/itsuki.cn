import { Database } from "@/types_db";
import type { CookieOptions } from "@supabase/ssr";
import {
  createServerClient as _createServerClient,
  createBrowserClient as _createBrowserClient,
} from "@supabase/ssr";
import { cookies } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";

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

export const createComment = async (
  row: Database["public"]["Tables"]["comment"]["Insert"],
) => {
  const supabase = createBrowserClient();
  try {
    const { data, error } = await supabase
      .from("comment")
      .insert([row])
      .select();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
