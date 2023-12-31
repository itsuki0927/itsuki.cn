import { getAllBlogs } from "@/app/db/notion";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await getAllBlogs({});
  return NextResponse.json({ data });
}
