import { redirect } from "next/navigation";
import { columns } from "./components/CommentTable/columns";
import { CommentTable } from "./components/CommentTable";
import { isAdminSession } from "../db/actions";
import { getAllComments } from "../lib/supabase";

export const metadata = {
  title: "Admin",
};

export default async function GuestbookPage() {
  const isAdmin = await isAdminSession();

  if (!isAdmin) {
    redirect("/");
  }

  const allComments = await getAllComments();

  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">admin</h1>

      <CommentTable columns={columns} data={allComments || []} />
    </section>
  );
}
