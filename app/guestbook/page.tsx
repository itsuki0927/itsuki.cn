import { Suspense } from "react";
import GuestbookForm from "./components/GuestbookForm";
import GuestbookList from "./components/GuestbookList";
import Title from "@/layouts/AppLayout/components/Title";

const CommentCardSkeleton = () => (
  <div className="flex space-x-4">
    <div className="rounded-full bg-zinc-200 h-10 w-10"></div>
    <div className="flex-1 space-y-6 py-1">
      <div className="h-4 bg-zinc-200 rounded"></div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-4 bg-zinc-200 rounded col-span-2"></div>
          <div className="h-4 bg-zinc-200 rounded col-span-1"></div>
        </div>
        <div className="h-4 bg-zinc-200 rounded"></div>
      </div>
    </div>
  </div>
);

const GuestbookPage = () => {
  return (
    <section className="container">
      <Title title="留言板">我们总会遇见</Title>

      <Suspense
        fallback={
          <div className="animate-pulse max-w-3xl flex-col space-y-4">
            <div className="mb-10">
              <div className="flex-1 h-24 mb-4 bg-zinc-200 rounded"></div>
              <div className="w-20 h-10 bg-zinc-200 rounded ml-auto"></div>
            </div>
            <CommentCardSkeleton />
            <CommentCardSkeleton />
            <CommentCardSkeleton />
          </div>
        }
      >
        <div className="max-w-3xl gap-8 flex flex-col">
          <GuestbookForm />
          <GuestbookList />
        </div>
      </Suspense>
    </section>
  );
};

export default GuestbookPage;
