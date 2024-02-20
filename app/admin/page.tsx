import { redirect } from "next/navigation";
import { columns } from "./components/CommentTable/columns";
import { CommentTable } from "./components/CommentTable";
import { isAdminSession } from "../db/actions";
import { getAllComments } from "../lib/supabase";
import Title from "../components/Title";

export const metadata = {
  title: "Admin",
};

export default async function GuestbookPage() {
  try {
    await isAdminSession();
  } catch (err) {
    redirect("/");
  }

  const allComments = await getAllComments();

  return (
    <section>
      <Title title="评论管理" subTitle="感谢你的友善发言"></Title>

      <CommentTable columns={columns} data={allComments || []} />
    </section>
  );
}
