import { auth } from "@/app/auth";
import { revalidateTag } from "next/cache";
import { createComment, getComments } from "@/app/lib/supabase";
import { PageProps } from "@/app/types";
import { User } from "next-auth";
import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const formatUser = (user: User | null) => {
  if (!user) return null;
  return {
    email: user.email ?? "",
    nickname: user.name || user.email || "",
    avatar: user.image || "",
  };
};

export async function GET(
  _: NextRequest,
  { params }: PageProps<{ blogId: string }>,
) {
  const data = await getComments(Number(params.blogId));
  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Not auth" }, { status: 401 });
  }

  const body = await request.json();
  const user = formatUser(session.user);

  const input = {
    ...body,
    ...user,
  };

  console.log("createComment input", body, user);

  const data = await createComment(input as any);

  if (data) {
    await revalidateTag("comment");
  }

  return NextResponse.json({ data });
}
