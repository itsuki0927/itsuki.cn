import { Suspense } from "react";
import GuestbookForm from "./components/GuestbookForm";
import GuestbookList from "./components/GuestbookList";
import Title from "../components/Title";

async function GuestbookPage() {
  return (
    <section className="container">
      <Title title="留言板" subTitle="我们总会遇见" />
      <Suspense>
        <div className="max-w-3xl">
          <GuestbookForm />
          <GuestbookList />
        </div>
      </Suspense>
    </section>
  );
}

export default GuestbookPage;
