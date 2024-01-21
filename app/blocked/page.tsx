import { ADMIN_EMAIL1 } from "@/constants/comment";

export const revalidate = 3600; // 1 hour

const BlockedPage = () => {
  return (
    <main className="flex py-24 w-full flex-col items-center justify-center text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
      <h1 className="mb-4 text-4xl font-black tracking-tighter">
        坏家伙做坏事，已禁止你的访问权限
      </h1>
      <span className="text-sm">
        如果你认为你不应该被禁，请联系我的邮箱{" "}
        <a href={`mailto:${ADMIN_EMAIL1}`} className="font-bold underline">
          {ADMIN_EMAIL1}
        </a>
      </span>
    </main>
  );
};

export default BlockedPage;
