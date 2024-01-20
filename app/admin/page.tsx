import { redirect } from "next/navigation";
import { columns } from "./components/CommentTable/columns";
import { CommentTable } from "./components/CommentTable";
import Title from "@/layouts/AppLayout/components/Title";
import { isAdminSession } from "@/actions/session";
import { getAllComments } from "@/actions/comment";

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
      <Title title="评论管理">感谢你的友善发言</Title>

      <CommentTable columns={columns} data={allComments || []} />
    </section>
  );
}
