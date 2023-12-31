import notion from "@/app/lib/notion";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: { pageId: string } },
) {
  // 获取数据库ID
  const pageId = params.pageId;

  const recordMap = await notion.getPage(pageId);
  const data = { recordMap };

  return NextResponse.json({ data });
}
